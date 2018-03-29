<template>
  <form-edit :fields="fields" :add="add"></form-edit>
</template>
<script>
import {
  addPath
} from '../../api/svn'
import FormEdit from '@/components/FormEdit'
export default {
  components: {
    FormEdit
  },
  data() {
    return {
      add: addPath,
      fields: [{
        label: '名称',
        name: 'name'
      }, {
        label: '目录',
        name: 'path'
      }]
    }
  }
}
</script>
