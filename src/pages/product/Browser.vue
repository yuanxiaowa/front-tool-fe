<template>
  <div>
    <v-btn flat to="/product">
      <v-icon>arrow_back</v-icon>
      返回列表
    </v-btn>
    <file-explorer v-model="path" :base="basePath"></file-explorer>
  </div>
</template>

<script>
import FileExplorer from '@/components/FileExplorer'
export default {
  components: {
    FileExplorer
  },
  data() {
    return {
      basePath: '',
      path: ''
    }
  },
  created() {
    this.basePath = this.path = this.$route.query.path
  }
}
</script>

<style>
</style>
