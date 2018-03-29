<template>
  <form-edit :fields="fields" :add="add"></form-edit>
</template>
<script>
import { addInfo } from '../../api/ssh'
import FormEdit from '@/components/FormEdit'
export default {
  components: {
    FormEdit
  },
  data() {
    return {
      add: addInfo,
      fields: [{
        label: '服务器',
        name: 'host'
      }, {
        label: '端口号',
        name: 'port',
        value: 22,
        type: 'number'
      }, {
        label: '用户名',
        name: 'username'
      }, {
        label: '密码',
        name: 'password',
        type: 'password'
      }]
    }
  }
}
</script>
