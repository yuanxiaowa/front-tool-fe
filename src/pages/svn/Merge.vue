<template>
  <div>
    <v-layout wrap>
      <v-flex xs8>
        <v-radio-group v-model="baseObj.mergeType" @change="getStructure" row>
          <v-radio label="branch" value="branch"></v-radio>
          <v-radio label="tag" value="tag"></v-radio>
          <v-radio label="trunk" value="trunk"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs4>
        <v-text-field label="版本库根目录名" v-model="baseObj.name"></v-text-field>
      </v-flex>
      <template v-if="baseObj.mergeType">
        <v-flex xs8>
          <v-select :items="urls" label="版本名" single-line bottom v-model="baseObj.url" autocomplete></v-select>
        </v-flex>
        <v-flex xs4>
          <v-btn color="primary" @click="getStructure">拉取</v-btn>
        </v-flex>
      </template>
    </v-layout>
    <div @contextmenu.prevent="onContextMenu">
      <v-data-table v-if="baseObj.url" v-model="selected" :headers="headers" :items="itemsWithMergeinfo" select-all item-key="revision" :pagination.sync="pagination" :total-items="pagination.totalItems" :loading="loading">
        <template slot="items" slot-scope="props">
          <tr :active="props.selected">
            <td>
              <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
            </td>
            <td>{{ props.item.revision }}
              <span v-if="props.item.isMerged" class="brown lighten-4">(已合并)</span>
            </td>
            <td>{{ props.item.msg }}</td>
            <td class="text-xs-center">{{ props.item.author }}</td>
            <td>
              {{ props.item.date|date }}
            </td>
            <td>
              <v-btn color="primary" @click="showLogFiles(props.item.paths)">查看</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <v-data-table v-if="logFiles.length>0" :headers="logFilesHeader" :items="logFiles" item-key="path">
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.path }}</td>
          <td class="text-xs-center">{{ props.item.kind }}</td>
          <td class="text-xs-center">{{ props.item.action }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-menu offset-y v-model="showMenu" absolute :position-x="x" :position-y="y" min-width="15em">
      <v-list>
        <v-list-tile @click="refresh">
          <v-list-tile-title>刷新记录</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title>
            <v-switch v-model="ignoreMerged" label="忽略已合并版本"></v-switch>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import {
  fetchLogs,
  merge,
  fetchStructure,
  mergeinfo
} from '../../api/svn'

var mapping = (() => {
  var data = JSON.parse(localStorage.getItem('latestMergeMappings')) || {};
  return {
    set(name, value) {
      data[name] = value;
      localStorage.setItem('latestMergeMappings', JSON.stringify(data));
    },
    get(name) {
      return data[name]
    }
  }
})();
export default {
  props: ['url', 'path'],
  data() {
    return {
      structures: null,
      headers: [
        { text: '版本', value: 'revision' },
        { text: '备注', value: 'msg', align: 'left' },
        { text: '提交者', value: 'author' },
        { text: '提交时间', value: 'date', align: 'left' },
        { text: '操作' }
      ],
      pagination: {
        sortBy: 'revision',
        descending: true,
        rowsPerPage: 10,
        page: 1,
        totalItems: 0
      },
      selected: [],
      items: [],
      revisions: [],
      logFiles: [],
      logFilesHeader: [
        {
          text: '路径',
          value: 'path',
          align: 'left'
        }, {
          text: '类型',
          value: 'kind',
          align: 'center'
        }, {
          text: 'Action',
          value: 'action',
          align: 'center'
        }
      ],
      loading: false,
      baseObj: {
        name: '',
        mergeType: 'branch',
        url: ''
      },
      x: 0,
      y: 0,
      showMenu: true,
      ignoreMerged: false
    }
  },
  watch: {
    url(v) {
      this.items = [];
      this.structures = null;
      this.logFiles = [];
      this.baseObj = mapping.get(v) || {
        name: '',
        mergeType: 'branch',
        url: ''
      };
      this.getStructure();
    },
    logQueryOptions(v, old) {
      if (v.path && JSON.stringify(v) !== JSON.stringify(old)) {
        this.getLogs()
      }
    },
    baseObj: {
      deep: true,
      handler(v, old) {
        mapping.set(this.url, this.baseObj);
        if (v.url && v.url !== old.url) {
          this.pagination.page = 1
          this.getMergeInfo()
        }
      }
    }
  },
  mounted() {
    var baseObj = mapping.get(this.url);
    if (baseObj) {
      this.baseObj = baseObj;
    }
  },
  methods: {
    getStructure() {
      if (this.structures && this.structures.trunks.length) {
        return;
      }
      fetchStructure(this.url, this.baseObj.name).then(data => {
        this.structures = data;
      })
    },
    showLogFiles(files) {
      var path = this.baseObj.url.replace(/^\w+:\/\/[^/]+/, '');
      var fname = files[0].path.match(/(\/[^/]+)/)[1];
      var i = path.indexOf(fname);
      var cs = path.slice(i);
      this.logFiles = files.filter(item => item.kind === 'file').map(item => ({
        path: item.path.replace(cs, '') || '.',
        kind: item.kind,
        action: item.action
      }));
    },
    getLogs() {
      this.loading = true;
      return fetchLogs(this.logQueryOptions).then(({ page, items, total }) => {
        this.pagination.totalItems = total
        this.pagination.page = page
        this.items = items;
        this.loading = false;
      })
    },
    getMergeInfo() {
      return mergeinfo(this.path, this.baseObj.url).then(revisions => {
        this.revisions = revisions
      })
    },
    mergeTo(path) {
      if (this.selected.length === 0) {
        return;
      }
      var revisions = this.selected.map(item => item.revision);
      return merge(path, this.baseObj.url, revisions);
    },
    onContextMenu(e) {
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    refresh() {
      this.getLogs(this.baseObj.url).then(() => {
        this.selected = []
      })
      this.getMergeInfo()
    }
  },
  computed: {
    urls() {
      var items = [];
      if (this.structures) {
        let mergeType = this.baseObj.mergeType
        if (mergeType === 'trunk') {
          items = this.structures.trunks;
        } else if (mergeType === 'tag') {
          items = this.structures.tags;
        } else {
          items = this.structures.branches;
        }
        if (items.length > 0) {
          items = items.filter(item => item.fullPath !== this.url).map(item => ({ text: item.name, value: item.fullPath }))
        }
      }
      return items;
    },
    filteredItems() {
      if (!this.ignoreMerged) {
        return this.items
      }
      return this.items.filter(item => !item.isMerged)
    },
    logQueryOptions() {
      return {
        path: this.baseObj.url,
        page: this.pagination.page,
        rowsPerPage: this.pagination.rowsPerPage
      }
    },
    itemsWithMergeinfo() {
      return this.filteredItems.map(item => Object.assign({
        isMerged: this.revisions.lastIndexOf(item.revision) > -1
      }, item))
    }
  }
}
</script>
