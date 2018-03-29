<template>
  <form-edit :fields="fields" :add="add"></form-edit>
</template>

<script>
import {
  add
} from '@/api/devserver'
import FormEdit from '@/components/FormEdit'
export default {
  components: {
    FormEdit
  },
  data() {
    return {
      add,
      fields: [{
        label: '名称',
        name: 'name'
      }, {
        label: '目录',
        name: 'dir'
      }, {
        label: '端口',
        name: 'port',
        type: 'number',
        value: 8888
      }, {
        label: '启动后自动打开浏览器',
        name: 'open',
        type: 'checkbox',
        value: false
      }, {
        label: '代理映射',
        name: 'proxy',
        multiple: true
      }]
    }
  }
}
</script>

<style>

</style>
