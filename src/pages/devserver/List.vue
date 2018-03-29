<template>
  <v-container fluid grid-list-md>
    <v-layout wrap>
      <v-flex md3 v-for="(item,i) in items" :key="i">
        <v-card flat tile>
          <v-card-media :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`" height="150px">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline" style="mix-blend-mode: color-burn;">{{item.name}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <div>
            <span class="grey--text">{{item.running?'运行中':'未运行'}}</span>
            <v-menu open-on-hover origin="center center" v-if="item.running">
              <v-btn color="primary" dark flat slot="activator">链接地址</v-btn>
              <v-list>
                <v-list-tile v-for="(v,j) in item.urls" :key="j">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <a target="_blank" :href="v[1]">{{ v[0] }}</a>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
          <v-card-actions>
            <v-btn @click="start(item)" color="primary" :disabled="item.disabled||item.running">启动</v-btn>
            <explorer :path="item.dir" />
            <v-btn @click="stop(item)" :disabled="item.disabled||!item.running">停止</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  start,
  stop,
  fetchList
} from '../../api/devserver'
import Explorer from '@/components/Explorer'
export default {
  components: {
    Explorer
  },
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList().then(items => {
        this.items = items;
      })
    },
    start(item) {
      item.disabled = true;
      start(item.dir).then(() => {
        item.disabled = false;
        this.getList();
      });
    },
    stop(item) {
      item.disabled = true;
      stop(item.dir).then(() => {
        item.disabled = false;
        this.getList();
      });
    }
  }
}
</script>

<style>

</style>
