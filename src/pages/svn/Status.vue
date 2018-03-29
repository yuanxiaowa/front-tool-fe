<template>
  <div>
    <v-card>
      <v-card-actions>
        <v-checkbox v-model="allSelected" label="选中所有" :indeterminate="isIndeterminate"></v-checkbox>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn icon title="刷新" @click="refresh" slot="activator">
            <v-icon>refresh</v-icon>
          </v-btn>
          <span>刷新</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
    <v-data-table v-model="selected" :headers="headers" :items="items" :loading="loading" :pagination.sync="pagination" item-key="path" select-all>
      <template slot="items" slot-scope="props">
        <tr :active="props.selected" :style="props.item.hasConflict?'background:red':''">
          <td>
            <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
          </td>
          <td>{{ props.item.path }}</td>
          <td class="text-xs-center">{{ props.item.type }}</td>
          <td class="text-xs-center">{{ props.item.revision }}</td>
          <td>
            <div v-if="props.item.commit">
              提交者：{{ props.item.commit.author }} <br> 时间：{{props.item.commit.date|date}}
              <br> 版本：{{props.item.commit.revision}}
            </div>
          </td>
          <!-- <td>
            <v-btn disabled color="primary">添加</v-btn>
          </td> -->
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { fetchStatus } from '../../api/svn'
export default {
  props: ['path'],
  data() {
    return {
      lastPath: '',
      loading: false,
      items: [],
      pagination: {
        rowsPerPage: 10
      },
      selected: [],
      headers: [
        { text: '路径', value: 'path', align: 'left' },
        { text: '状态', value: 'type', align: 'center' },
        { text: '版本', value: 'revision' },
        { text: '上次提交', align: 'left' }/* ,
        { text: '操作' } */
      ]
    }
  },
  watch: {
    path: {
      handler(v) {
        if (v) {
          this.getList(v);
        }
      },
      immediate: true
    }
  },
  methods: {
    getList(path) {
      this.lastPath = path;
      this.loading = true;
      fetchStatus(path).then(data => {
        this.loading = false;
        this.items = this.selected = data[0].entries;
      })
    },
    refresh() {
      this.getList(this.lastPath);
    }
  },
  computed: {
    conflictFiles() {
      return this.selected.filter(item => item.hasConflict).map(item => item.path)
    },
    newFiles() {
      return this.selected.filter(item => item.type === 'unversioned').map(item => item.path);
    },
    delFiles() {
      return this.selected.filter(item => item.type === 'missing' || item.type === 'deleted').map(item => item.path);
    },
    allSelected: {
      set(v) {
        this.selected = v ? this.items : []
      },
      get() {
        return this.items.length === this.selected.length
      }
    },
    isIndeterminate() {
      return this.selected.length > 0 && this.items.length > this.selected.length
    }
  }
}
</script>

