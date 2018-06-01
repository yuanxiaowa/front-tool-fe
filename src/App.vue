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
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{confirmTitle}}</v-card-title>
        <!-- <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="onCancel">取消</v-btn>
          <v-btn color="primary darken-1" flat="flat" @click.native="onConfirm">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar :timeout="3000" top v-model="snackbar">
      {{snackText}}
    </v-snackbar>
  </v-app>
</template>

<script>
import Vue from 'vue'

const bus = new Vue()

Vue.use(function (Vue) {
  Vue.prototype.$toast = function (msg) {
    bus.$emit('toast', msg)
  }
  Vue.prototype.$confirm = function (msg) {
    bus.$emit('confirm', msg)
    return new Promise((resolve, reject) => {
      bus.$on('confirm-ok', resolve)
      bus.$on('confirm-cancel', reject)
    })
  }
})
export default {
  name: 'app',
  data() {
    return {
      snackbar: false,
      snackText: '',
      dialog: false,
      confirmTitle: ''
    }
  },
  created() {
    bus.$on('toast', msg => {
      this.snackbar = true;
      this.snackText = msg;
    })
    bus.$on('confirm', msg => {
      this.confirmTitle = msg
      this.dialog = true
    })
  },
  methods: {
    onConfirm() {
      this.dialog = false
      bus.$emit('confirm-ok')
    },
    onCancel() {
      this.dialog = false
      bus.$emit('confirm-cancel')
    }
  }
}
</script>

<style>
</style>
