<template>
  <v-card>
    <v-layout>
      <v-flex>
        <div class="headline">资源列表</div>
      </v-flex>
      <div>
        <v-btn fab dark small color="pink" :loading="loading" title="刷新" @click="load">
          <v-icon dark>refresh</v-icon>
        </v-btn>
        <uploader :context="ctx" dir="" keep-name title="添加" @success="onAdd" accept="application/x-zip-compressed">
          <!-- <v-icon x-large dark>add</v-icon> -->
          <span class="pa-2">
            <v-icon x-large dark color="pink">add</v-icon>
          </span>
        </uploader>
      </div>
    </v-layout>
    <v-data-table v-if="items.length>0" :headers="headers" :items="items" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">
          <v-icon>star</v-icon>
          <a @click="onClick(props.item)">{{ props.item.name }}</a>
        </td>
        <td>{{ props.item.ctime | date }}</td>
        <td>{{ props.item.mtime | date }}</td>
        <td class="text-xs-right">
          <v-btn color="primary" flat title="查看" @click="onClick(props.item)">
            查看
          </v-btn>
          <v-btn color="error" flat title="删除" @click="del(props.item.path)">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn title="下载" flat :href="props.item.zipUrl" target="_blank">
            <v-icon>cloud_download</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-alert :value="true" type="info" v-else>
      无文件
    </v-alert>
  </v-card>
</template>

<script>
import { list, zip } from '@/api/product'
import { delFile } from '@/api/common'
import Uploader from '@/components/Uploader'
export default {
  components: {
    Uploader
  },
  data() {
    return {
      headers: [
        { text: '名称', value: 'name' },
        { text: '修改时间', value: 'mtime' },
        { text: '创建时间', value: 'ctime' },
        { text: '操作', align: 'center', sortable: false }
      ],
      items: [],
      ctx: '',
      loading: true
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.loading = true
      list().then(({ ctx, items }) => {
        this.ctx = ctx
        this.items = items.sort((prev, next) => next.mtime - prev.mtime)
        this.loading = false
      })
    },
    async onAdd(path) {
      var data = await zip(path)
      this.items.push(data)
      await this.load()
      this.$toast('添加成功')
    },
    onClick(item) {
      this.$router.push({
        path: '/product/browser',
        query: {
          path: item.path
        }
      })
    },
    async del(path) {
      try {
        await this.$confirm('确定要删除吗？')
      } catch (e) {
        return
      }
      await delFile(path)
      this.$toast('删除成功')
      await this.load()
    }
  }
}
</script>

<style>
</style>
