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
        <router-view />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ['menus']
}
</script>
