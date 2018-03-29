<template>
  <form-edit :fields="fields" :add="add"></form-edit>
</template>
<script>
import { addDir } from '../../api/project'
import FormEdit from '@/components/FormEdit'
export default {
  components: {
    FormEdit
  },
  data() {
    return {
      add: addDir,
      fields: [{
        label: '名称',
        name: 'name'
      }, {
        label: '路径',
        name: 'value'
      }]
    }
  }
}
</script>
