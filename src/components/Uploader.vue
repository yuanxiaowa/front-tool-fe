<template>
  <file-upload style="vertical-align:middle" @input-file="addFile" name="file" :put-action="uploadUrl" :multiple="multiple" :accept="accept">
    <slot />
  </file-upload>
</template>

<script>
import FileUpload from 'vue-upload-component/src'
import { getUploadUrl } from '@/api/common'
export default {
  props: {
    context: String,
    path: String,
    keepName: Boolean,
    drop: {
      type: Boolean,
      default() {
        return true
      }
    },
    multiple: {
      type: Boolean,
      default() {
        return false
      }
    },
    accept: {
      type: String,
      default() {
        return 'image/*'
      }
    },
    dir: {
      type: String,
      default() {
        return 'images'
      }
    }
  },
  components: {
    FileUpload
  },
  data() {
    return {
      uploadUrl: getUploadUrl()
    }
  },
  methods: {
    addFile(item, oldItem) {
      if (!item) {
        return
      }
      if (item && oldItem) {
        if (item.success !== oldItem.success) {
          this.$emit('success', item.response.data)
        }
        return
      }
      var file = item.file;
      var name = Date.now() + Math.random().toString().substring(2, 5) + '.' + file.name.substring(file.name.lastIndexOf('.') + 1)
      var path = this.path
      if (!path) {
        if (this.keepName) {
          path = this.context + '/' + file.name
        } else {
          path = this.context + '/' + (this.dir ? this.dir + '/' : '') + name
        }
      }
      item.data = {
        path
      }
      this.$emit('input', {
        path,
        name,
        type: file.type,
        url: this.getImageDataUrl(file)
      })
      item.active = true
    },
    getImageDataUrl(file) {
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        return URL.createObjectURL(file)
      }
    }
  }
}
</script>

<style>
</style>
