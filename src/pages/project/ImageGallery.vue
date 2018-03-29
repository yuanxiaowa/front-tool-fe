<template>
  <div>
    <div class="text-xs-right">
      <file-upload title="添加" @input-file="addFile" :put-action="uploadUrl" multiple accept="image/*">
        <!-- <v-icon x-large dark>add</v-icon> -->
        <span class="pa-2">
          <v-icon x-large dark color="pink">add</v-icon>
        </span>
      </file-upload>
    </div>
    <template v-if="list.length">
      <v-container fluid grid-list-md>
        <v-layout wrap>
          <v-flex xs4 v-for="item in list" :key="item.url">
            <v-card flat tile>
              <v-card-media :src="item.url" contain>
                <file-upload style="height:150px;display:block;width:100%" name="file" :drop="true" :data="{path:item.src}" @input-file="inputFile($event,item)" :put-action="uploadUrl" :accept="item.type">
                </file-upload>
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
import { fetchImages } from '../../api/project'
import { getUploadUrl, getFileUrl } from '../../api/common'
import FileUpload from 'vue-upload-component/src'

export default {
  props: ['dir'],
  components: {
    FileUpload
  },
  data() {
    return {
      list: [],
      uploadUrl: getUploadUrl()
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
              type: this.getMimeType(src.substring(src.lastIndexOf('.') + 1))
            }
          })
        })
      }
    }
  },
  methods: {
    inputFile(newFile, item) {
      newFile.active = true
      item.url = this.getImageDataUrl(newFile.file)
    },
    addFile(item, oldItem) {
      if (!item || item.data.path) {
        return
      }
      var file = item.file;
      var ext = file.name.substring(file.name.lastIndexOf('.'))
      var name = Date.now() + Math.random().toString().substring(2, 5) + ext
      var path = this.dir + '/images/' + name
      item.data = {
        path: path
      }
      this.list.push({
        src: path,
        url: this.getImageDataUrl(file),
        name,
        type: this.getMimeType(ext.substring(1))
      })
      item.active = true
    },
    getImageDataUrl(file) {
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        return URL.createObjectURL(file)
      }
    },
    getMimeType(type) {
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
