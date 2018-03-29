<template>
  <v-app light>
    <v-toolbar color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="white--text">
          ECOVACS前端控制台
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view />
    <v-snackbar :timeout="3000" top v-model="snackbar">
      {{snackText}}
    </v-snackbar>
  </v-app>
</template>

<script>
import mid from './util/mid'
export default {
  name: 'app',
  data() {
    return {
      snackbar: false,
      snackText: ''
    }
  },
  created() {
    mid.$on('toast', msg => {
      this.snackbar = true;
      this.snackText = msg;
    })
  },
  beforeDestroy() {
    mid.$off('toast')
  }
}
</script>

<style>

</style>
