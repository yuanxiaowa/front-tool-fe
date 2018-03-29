<template>
  <div>
    <link rel="stylesheet" href="https://editor.swagger.io//dist/swagger-editor.css">
    <div id="swagger-editor"></div>
  </div>
</template>

<script>
// import Swagger from 'swagger-client'
import { getScript } from '../../api/common'
export default {
  async mounted() {
    await getScript('https://editor.swagger.io//dist/swagger-editor-bundle.js')
    await getScript('https://editor.swagger.io//dist/swagger-editor-standalone-preset.js')
    // await getScript('//cdn.bootcss.com/swagger-ui/3.5.0/swagger-ui.js')
    const editor = window.SwaggerEditorBundle({
      url: '/static/swagger.json',
      dom_id: '#swagger-editor',
      layout: 'StandaloneLayout',
      presets: [
        window.SwaggerEditorStandalonePreset
      ]
    })
    window.editor = editor
    /* Swagger('http://petstore.swagger.io/v2/swagger.json').then(res => {
      console.log(res)
      window.res = res;
    }) */
  }
}
</script>
