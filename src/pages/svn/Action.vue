<template>
  <v-form>
    <v-layout wrap>
      <v-select :items="paths" label="本地版本库" bottom v-model="path"></v-select>
      <explorer :path="path" />
    </v-layout>
    <div v-if="path">
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">状态</div>
          <svn-status :path="path" ref="svnStatus" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-divider></v-divider>
      <v-card>
        <v-card-text>
          <v-checkbox label="更新" v-model="isUpdate"></v-checkbox>
        </v-card-text>
      </v-card>
      <v-expansion-panel expand>
        <v-expansion-panel-content>
          <v-checkbox label="合并" v-model="isMerge" slot="header"></v-checkbox>
          <v-container v-if="isMerge">
            <svn-merge :url="info.url" :path="path" ref="svnMerge"></svn-merge>
          </v-container>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="isCommit">
          <v-checkbox label="提交" v-model="isCommit" slot="header"></v-checkbox>
          <svn-commit v-model="msg" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <div>
        <v-btn color="primary" @click="excute" :disabled="isExcuting">执行</v-btn>
      </div>
      <log-board ref="logBoard"></log-board>
    </div>
  </v-form>
</template>

<script>
import SvnStatus from './Status'
import SvnMerge from './Merge'
import SvnCommit from './Commit'
import LogBoard from '@/components/LogBoard'
import Explorer from '@/components/Explorer'

import {
  fetchPaths,
  fetchInfo,
  update,
  resolveFiles,
  addFiles,
  delFiles,
  commitFiles
} from '../../api/svn'

export default {
  components: {
    SvnStatus,
    SvnMerge,
    SvnCommit,
    LogBoard,
    Explorer
  },
  data() {
    return {
      info: {},
      isUpdate: true,
      isCommit: true,
      isMerge: false,
      msg: '',
      path: '',
      paths: [],
      isExcuting: false
    }
  },
  mounted() {
    this.path = localStorage.getItem('latestPath');
    fetchPaths().then(data => {
      this.paths = data.map(item => ({ text: item.name, value: item.path }));
    })
  },
  watch: {
    path(v) {
      if (!v) {
        return;
      }
      this.getInfo();
      localStorage.setItem('latestPath', v);
    }
  },
  methods: {
    addRecord(txt, type) {
      if (!txt) { return }
      this.$refs.logBoard.add(txt, type)
    },
    getInfo() {
      fetchInfo(this.path).then(data => {
        this.info = data[0];
      })
    },
    update() {
      return update(this.path).then(data => {
        this.addRecord(data);
      });
    },
    resolve(paths) {
      if (paths.length) {
        return resolveFiles(paths, this.path).then(data => {
          this.addRecord(data);
        });
      }
    },
    async excute() {
      this.isExcuting = true;
      var addRecord = (data, type) => this.addRecord(data, type);
      var svnStatus = this.$refs.svnStatus;
      try {
        if (this.isUpdate) {
          await this.update();
          await svnStatus.refresh();
        }
        await this.resolve(svnStatus.conflictFiles);
        if (this.isMerge) {
          await this.$refs.svnMerge.mergeTo(this.path).then(addRecord)
          await svnStatus.refresh()
          await this.resolve(svnStatus.conflictFiles);
          await svnStatus.refresh()
        }
        if (this.isCommit) {
          if (svnStatus.newFiles.length > 0) {
            await addFiles(svnStatus.newFiles, this.path).then(addRecord);
          }
          if (svnStatus.delFiles.length > 0) {
            await delFiles(svnStatus.delFiles, this.path).then(addRecord);
          }
          await commitFiles(this.path, [], this.msg).then(addRecord);
        }
        await svnStatus.refresh();
      } catch (e) {
        addRecord(e, 'error');
      }
      this.isExcuting = false;
    }
  }
}
</script>