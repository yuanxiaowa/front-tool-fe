<template>
  <v-tooltip bottom>
    <v-btn @click="explore" slot="activator">...</v-btn>
    <span>{{path}}</span>
  </v-tooltip>
</template>

<script>
import { explore } from '../api/common'
export default {
  props: ['path'],
  methods: {
    explore() {
      explore(this.path)
    }
  }
}
</script>

<style>

</style>
