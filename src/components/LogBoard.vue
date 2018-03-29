<template>
  <div>
    <div class="log-board" @contextmenu="show">
      <div v-for="(item,i) of records" :key="i">
        <time style="color:blue">{{item.time}}</time>
        <v-alert v-if="item.type==='error'" outline color="error" icon="warning" :value="true">
          <div v-html="item.content"></div>
        </v-alert>
        <v-alert v-else outline color="info" icon="info" :value="true">
          <div v-html="item.content"></div>
        </v-alert>
      </div>
    </div>
    <v-menu offset-y v-model="showMenu" absolute :position-x="x" :position-y="y">
      <v-list>
        <v-list-tile @click="clear">
          <v-list-tile-title>清空</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
<style>
.log-board {
  max-height: 500px;
  text-align: left;
  overflow: auto;
}
</style>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      showMenu: false,
      records: []
    }
  },
  methods: {
    add(txt, type) {
      txt = txt.replace(/\r?\n/g, '<br>');
      this.records.unshift({
        time: new Date().toTimeString(),
        content: txt.trim(),
        type
      });
    },
    show(e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    clear() {
      this.records = [];
    }
  }
}
</script>

<style>

</style>
