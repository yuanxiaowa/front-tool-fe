<template>
  <v-container grid-list-md text-xs-center>
    <v-layout nowrap>
      <v-navigation-drawer stateless light value="true">
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                菜单
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense class="pt-0">
          <v-list-tile v-for="item in menus" :key="item.title" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-flex>
        <v-list two-line>
          <template v-for="item in list">
            <v-list-tile avatar :key="item.value" :to="{path:'/project/projects',query:{path:item.value}}">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="item.value"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fetchDirs } from '../../api/project'

export default {
  data() {
    return {
      list: [],
      menus: [
        { title: '目录', icon: 'dashboard', link: '/project' },
        { title: '添加目录', icon: 'add', link: '/project/add' }
      ]
    }
  },
  created() {
    fetchDirs().then(list => {
      this.list = list
    })
  }
}
</script>

<style>

</style>
