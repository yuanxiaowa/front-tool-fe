<template>
  <v-container grid-list-lg>
    <v-layout wrap>
      <v-flex xs3 v-for="item in list" :key="item.id">
        <v-card height="100%" hover>
          <v-card-media class="white--text" height="200px" :src="item.img">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{item.name}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title>
            <div>
              <span class="grey--text">{{item.date|date}}</span><br>
              {{item.desc}}
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" :to="`/interface/edit/${item.id}`">编辑</v-btn>
            <v-btn flat color="primary" :to="`/interface/preview/${item.id}`">查看</v-btn>
            <v-btn flat color="red" @click.stop="del(item)">删除</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        id: 1,
        name: '接口1',
        img: 'https://unsplash.it/150/300?image=13',
        date: '2017-11-30 13:17:58',
        desc: ''
      }, {
        id: 2,
        name: '接口2',
        img: 'https://unsplash.it/150/300?image=24',
        date: '2017-11-30 13:17:58',
        desc: '这是接口2'
      }, {
        id: 3,
        name: '接口3',
        img: 'https://unsplash.it/150/300?image=7',
        date: '2017-11-30 13:17:58',
        desc: '这是接口3'
      }]
    }
  },
  methods: {
    del(item) {
      var i = this.list.indexOf(item);
      this.list.splice(i, 1);
    }
  }
}
</script>

<style>

</style>
