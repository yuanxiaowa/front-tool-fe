<template>
  <v-layout row>
    <v-flex xs4>
      <v-card class="d-inline-block pa-5">
        <v-navigation-drawer permanent floating light>
          <v-list dense class="pt-0">
            <v-list-tile v-for="item in items" :key="item.title" @click="go(item.link)">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-flex>
    <v-flex>
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: '账号列表', icon: 'dashboard', link: '/shell' },
        { title: '添加账号', icon: 'add', link: '/shell/add' }
      ]
    }
  },
  methods: {
    go(link) {
      this.$router.push(link)
    }
  }
}
</script>

<style>

</style>
