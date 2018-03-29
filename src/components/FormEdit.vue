<template>
  <v-form @submit.prevent="onAdd">
    <template v-for="(item,i) in fields">
      <v-select v-if="item.type==='select'" :items="item.items" :label="item.label" :required="item.required" bottom v-model="item.value" :key="i"></v-select>
      <v-switch v-else-if="item.type==='checkbox'" :label="item.label" v-model="item.value" color="red" :key="i"></v-switch>
      <v-text-field v-else-if="item.type==='number'" :label="item.label" :type="item.type" :required="item.required" v-model.number="item.value" :key="i"></v-text-field>
      <v-text-field v-else :label="item.label" :type="item.type" :required="item.required" :multi-line="item.multiple" v-model.trim="item.value" clearable :key="i"></v-text-field>
    </template>
    <slot />
    <div>
      <v-btn color="primary" type="submit" :disabled="disabled">添加</v-btn>
    </div>
  </v-form>
</template>
<script>

import mid from '../util/mid'
export default {
  props: ['fields', 'add'],
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    async onAdd() {
      var params = {};
      this.disabled = true;
      this.fields.forEach(item => {
        params[item.name] = item.value;
      })
      try {
        await this.add(params)
        mid.$emit('toast', '添加成功');
      } finally {
        this.disabled = false;
      }
    }
  }
}
</script>
