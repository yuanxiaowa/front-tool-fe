<template>
  <div>
    <link rel="stylesheet" href="https://editor.swagger.io//dist/swagger-editor.css">
    <div id="swagger-ui"></div>
  </div>
</template>

<script>
// import Swagger from 'swagger-client'
import { getScript } from '../../api/common'
export default {
  async mounted() {
    await getScript('http://petstore.swagger.io/swagger-ui-bundle.js')
    await getScript('http://petstore.swagger.io/swagger-ui-standalone-preset.js')
    var SwaggerUIBundle = window.SwaggerUIBundle;
    var SwaggerUIStandalonePreset = window.SwaggerUIStandalonePreset;
    const ui = SwaggerUIBundle({
      url: 'http://petstore.swagger.io/v2/swagger.json',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: 'StandaloneLayout'
    })
    window.ui = ui;
    /* Swagger('http://petstore.swagger.io/v2/swagger.json').then(res => {
      console.log(res)
      window.res = res;
    }) */
  }
}
</script>