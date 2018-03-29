<template>
  <v-container fluid grid-list-md>
    <v-layout wrap>
      <v-flex xs12 md3 sm6 v-for="item in items" :key="item.to">
        <v-card :to="item.to" :color="item.color + ' darken-2'" ripple class="white--text">
          <v-card-media :src="item.img" height="250px"></v-card-media>
          <v-card-title primary-title>
            <div class="headline">{{item.name}}</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: '项目管理',
          to: 'project',
          color: 'green',
          img: 'https://vuetifyjs.com/static/doc-images/cards/house.jpg'
        },
        {
          name: '本地SVN管理工具',
          to: 'svn',
          color: 'cyan',
          img: 'https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'
        }, {
          name: 'Shell工具',
          to: 'shell',
          color: 'light-blue',
          img: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg'
        },
        {
          name: '接口管理工具',
          to: 'interface',
          color: 'red', // teal
          img: 'https://vuetifyjs.com/static/doc-images/cards/house.jpg'
        }, {
          name: '开发服务器',
          to: 'devserver',
          color: 'light-blue',
          img: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg'
        }
      ]
    }
  }
}
</script>
