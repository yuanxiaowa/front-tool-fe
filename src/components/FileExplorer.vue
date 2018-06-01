<template>
  <v-card>
    <v-breadcrumbs divider="/">
      <v-breadcrumbs-item v-for="(item,i) in bitems" :key="i" :disabled="item.disabled" @click.native="next(item)">
        {{ item.name }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-list v-if="items.length>0">
      <template v-for="(item,i) in items">
        <v-list-tile :key="item.name" avatar v-bind="{href:item.dir?undefined:item.url}" target="_blank" @click="next(item)">
          <v-list-tile-avatar>
            <v-icon class="grey lighten-1 white--text">{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            <!-- <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title> -->
          </v-list-tile-content>
          <!-- <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-tile-action> -->
        </v-list-tile>
        <v-divider :key="i"></v-divider>
      </template>
    </v-list>
    <div v-else>
      <v-alert :value="true" type="info">
        无文件
      </v-alert>
    </div>
  </v-card>
</template>

<script>
import { listFiles } from '@/api/common'
export default {
  props: ['value', 'base'],
  data() {
    return {
      items: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        if (v) {
          this.loadItems(v)
        }
      }
    }
  },
  methods: {
    next(item) {
      if (!item.dir) {
        return
      }
      this.$emit('input', item.path)
    },
    loadItems(path) {
      listFiles(path).then(items => {
        this.items = items.sort((prev, next) => prev.dir ? -1 : 1).map(item => Object.assign(item, {
          icon: item.dir ? 'folder' : 'assignment',
          url: '/product' + item.path.replace(this.basedir, '')
        }))
      })
    }
  },
  computed: {
    bitems() {
      var items = this.value.replace(this.base, '').split(/\\|\//)
      var i = this.base.lastIndexOf('/')
      var basename = this.base.substring(i + 1)
      if (items.length === 0) {
        items.push(basename)
      } else {
        items[0] = basename
      }
      items.reduce((state, name, index) => {
        state.push(name)
        items[index] = {
          name,
          disabled: index === items.length - 1,
          path: state.join('/'),
          dir: true
        }
        return state
      }, [this.basedir])
      return items
    },
    basedir() {
      var i = this.base.lastIndexOf('/')
      return this.base.substring(0, i)
    }
  }
}
</script>

<style>
</style>
