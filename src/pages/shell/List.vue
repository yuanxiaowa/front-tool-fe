<template>
  <v-container fluid style="min-height: 0;" grid-list-lg>
    <v-layout row wrap>
      <v-flex xs3 v-for="(item,i) in list" :key="item.id">
        <v-card :color="colors[i%3]" class="white--text">
          <v-card-title primary-title>
            <div class="headline">{{item.host}}</div>
            <div>{{item.username}}</div>
          </v-card-title>
          <v-card-actions>
            <router-link :to="`/shell/${item.id}`"><v-btn dark>进入</v-btn></router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fetchInfos } from '../../api/ssh'
export default {
  data() {
    return {
      list: [],
      colors: ['blue-grey darken-2', 'cyan darken-2', 'purple']
    }
  },
  created() {
    fetchInfos().then(data => {
      this.list = data
    });
  }
}
</script>

<style>

</style>
