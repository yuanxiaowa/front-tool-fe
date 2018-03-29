<template>
  <v-layout>
    <v-flex md3>
      <v-tree ref="tree" :data="list" @node-click="onNodeClick" @node-expanded="onNodeExpand"></v-tree>
    </v-flex>
    <v-flex md9>
      <image-gallery v-if="type==='image'" :dir="dir"></image-gallery>
      <data-editor v-else-if="type==='data'" :dir="dir"></data-editor>
      <v-alert v-else color="grey lighten-1" icon="priority_high" value="true">
        暂无功能
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>

import { fetchProjects, fetchModules } from '../../api/project'
import 'vue-tree-halower/dist/halower-tree.min.css' // you can customize the style of the tree
import VTree from 'vue-tree-halower'
import ImageGallery from './ImageGallery'
import DataEditor from './DataEditor'
export default {
  components: {
    VTree,
    ImageGallery,
    DataEditor
  },
  data() {
    return {
      checkedIds: [],
      list: [],
      type: '',
      dir: ''
    }
  },
  created() {
    var { path, pos } = this.$route.query
    fetchProjects(path).then(data => {
      this.list = data.map((value, i) => {
        return {
          title: value.substring(value.lastIndexOf('/') + 1),
          value,
          children: [],
          expanded: false
        }
      })
      if (pos) {
        this.initPos(pos.split('/'))
      }
    })
  },
  methods: {
    initPos(pos) {
      let index = pos[0]
      if (index !== undefined) {
        let node = this.list[index]
        node.expanded = true
        this.onNodeExpand(node).then(() => {
          var index = pos[1];
          if (index !== undefined) {
            node = node.children[index];
            node.expanded = true
            node = node.children[pos[2]]
            node.selected = true
            this.onNodeClick(node)
          }
        })
      }
    },
    onNodeExpand(node) {
      node.loading = true
      return fetchModules(node.value).then(data => {
        node.children = data.map(value => {
          return {
            title: value.substring(value.lastIndexOf('/') + 1),
            expanded: false,
            children: [{
              title: '图片',
              value,
              type: 'image',
              selected: false
            }, {
              title: '数据',
              value,
              type: 'data',
              selected: false
            }]
          }
        })
        node.loading = false
      })
    },
    onNodeClick(node) {
      this.contentData = []
      if (node.type) {
        this.type = node.type
        this.dir = node.value
        var ret = []
        this.getNodeIndex(node, ret)
        this.$router.replace({
          path: this.$route.path,
          query: {
            path: this.$route.query.path,
            pos: ret.join('/')
          }
        })
      }
    },
    getNodeIndex(node, ret) {
      if (node.parent) {
        this.getNodeIndex(node.parent, ret)
        ret.push(node.parent.children.indexOf(node))
      } else {
        ret.push(this.list.indexOf(node))
      }
    }
  }
}
</script>

<style>

</style>
