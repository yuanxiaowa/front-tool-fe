<template>
  <div>
    <div class="text-xs-right">
      <uploader :context="dir" title="添加" @input="addFile">
        <!-- <v-icon x-large dark>add</v-icon> -->
        <span class="pa-2">
          <v-icon x-large dark color="pink">add</v-icon>
        </span>
      </uploader>
    </div>
    <template v-if="list.length">
      <v-container fluid grid-list-md>
        <v-layout wrap>
          <v-flex xs4 v-for="item in list" :key="item.url">
            <v-card flat tile>
              <v-card-media :src="item.url" contain>
                <uploader style="height:150px;display:block;width:100%" :context="dir" :path="item.src" @input="inputFile($event,item)" :accept="item.type">
                </uploader>
              </v-card-media>
              <v-card-title primary-title>
                <div>
                  <div class="headline">
                    <a :href="item.url" target="_blank">{{item.name}}</a>
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
    <v-alert v-else color="grey lighten-1" icon="priority_high" value="true">
      无内容
    </v-alert>
  </div>
</template>

<script>
import { fetchImages } from '@/api/project'
import { getFileUrl } from '@/api/common'
import Uploader from '@/components/Uploader'

export default {
  props: ['dir'],
  components: {
    Uploader
  },
  data() {
    return {
      list: []
    }
  },
  watch: {
    dir: {
      immediate: true,
      handler(dir) {
        fetchImages(dir).then(data => {
          this.list = data.map(src => {
            return {
              src,
              url: getFileUrl(src),
              name: src.substring(src.lastIndexOf('/') + 1),
              type: this.getMimeType(src)
            }
          })
        })
      }
    }
  },
  methods: {
    inputFile(data, item) {
      item.url = data.url
    },
    addFile(data) {
      this.list.push({
        src: data.path,
        url: data.url,
        name: data.name,
        type: data.type
      })
    },
    getMimeType(src) {
      var type = src.substring(src.lastIndexOf('.') + 1)
      if (type === 'jpg') {
        type = 'jpeg'
      }
      return 'image/' + type
    }
  }
}
</script>

<style>

</style>
