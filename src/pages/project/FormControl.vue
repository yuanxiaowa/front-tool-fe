<template>
  <div>
    <v-checkbox v-if="item.type==='boolean'" :label="item.name" v-model="item.value" light></v-checkbox>
    <v-text-field v-else v-model="item.value" :label="item.name"></v-text-field>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>
