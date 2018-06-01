<template>
  <label>
    <input type="file" style="display:none" @change="onChange" :accept="accept">
    <slot />
  </label>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default() {
        return 'text'
      }
    },
    accept: String
  },
  methods: {
    onChange(e) {
      var files = e.target.files
      var reader = new FileReader()
      reader.readAsText(files[0])
      reader.onload = e => {
        this.$emit('input', e.target.result)
      }
    }
  }
}
</script>

<style>

</style>
