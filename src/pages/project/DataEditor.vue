<template>
  <v-container fluid>
    <v-select :items="list" v-model="name" label="选择文件" single-line bottom autocomplete></v-select>
    <v-form v-if="name" @submit.stop="onSubmit">
      <template v-for="(item,i) in datas">
        <div v-if="item.type==='array'" :key="i">
          <v-subheader>
            {{item.name}}
            <v-btn flat icon color="pink" @click="addItem(item.value)">
              <v-icon>add</v-icon>
            </v-btn>
          </v-subheader>
          <v-expansion-panel ref="panel" :item="item.value">
            <v-expansion-panel-content :hide-actions="_item.length===1" v-for="(_item,j) in item.value" :key="j">
              <v-layout slot="header" v-if="_item.length===1">
                <v-icon class="my-handle">widgets</v-icon>
                <span>{{j+1}}</span>
                <v-flex>
                  <form-control :item="_item[0]"></form-control>
                </v-flex>
              </v-layout>
              <template v-else>
                <div slot="header">
                  <v-icon class="my-handle">widgets</v-icon>
                  {{j+1}}
                </div>
                <v-card v-for="(item,k) in _item" :key="k">
                  <v-card-text>
                    <form-control :item="item"></form-control>
                  </v-card-text>
                </v-card>
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </div>
        <div class="my-handle" v-else :key="i">
          <form-control :item="item"></form-control>
        </div>
      </template>
      <v-btn color="primary" type="submit">保存</v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator">新增</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">添加字段</span>
          </v-card-title>
          <v-card-text>
            <form-edit :fields="fields" :add="add"></form-edit>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-form>
  </v-container>
</template>

<script>
import { fetchDatas, getData, saveData } from '../../api/project'
import Sortable from 'sortablejs'
import FormControl from './FormControl'
import FormEdit from '@/components/FormEdit'

function getStructure(data) {
  return Object.keys(data).map(key => {
    var value = data[key]
    var type
    if (Array.isArray(value)) {
      type = 'array'
      value = value.map(item => {
        if (typeof item !== 'object') {
          return [{
            type: typeof item,
            value: item
          }]
        }
        return getStructure(item)
      })
    } else {
      type = typeof value
    }
    return {
      type,
      value,
      name: key
    }
  })
}

export default {
  props: ['dir'],
  components: {
    FormControl,
    FormEdit
  },
  data() {
    return {
      list: [],
      name: '',
      datas: [],
      fields: [{
        label: '名字',
        name: 'name'
      }, {
        label: '类型',
        name: 'type',
        items: ['string', 'number', 'array', 'boolean'],
        type: 'select',
        value: 'string'
      }, {
        label: '初始值',
        name: 'value'
      }],
      dialog: false,
      sortables: []
    }
  },
  beforeDestroy() {
    this.sortables.forEach(item => {
      item.destroy()
    })
    // this.name = 'E:/github/front-projects/src/projects/project1/modules/module1/data/index2.json'
  },
  watch: {
    dir: {
      immediate: true,
      handler(dir) {
        fetchDatas(dir).then(list => {
          this.list = list.map(value => ({
            text: value.substring(value.lastIndexOf('/') + 1),
            value
          }))
        })
      }
    },
    name(v) {
      getData(v).then(data => {
        this.datas = getStructure(data)
        this.bindSortable()
      })
    }
  },
  methods: {
    bindSortable() {
      this.$nextTick(() => {
        this.$refs.panel.forEach(component => {
          if (component.hasSortable) {
            return
          }
          component.hasSortable = true
          Sortable.create(component.$el, {
            handle: '.my-handle',
            onEnd(e) {
              if (e.newIndex === e.oldIndex) {
                return
              }
              var arr = component.$attrs.item
              var value = arr[e.oldIndex]
              arr[e.oldIndex] = arr[e.newIndex]
              arr[e.newIndex] = value
            }
          })
        })
      })
    },
    add(data) {
      if (!data.name) {
        return
      }
      var value = data.value
      if (data.type === 'array') {
        try {
          // eslint-disable-next-line
          let json = window.eval(`(${value})`)
          let type = typeof json
          if (type === 'boolean' || type === 'string' || type === 'number') {
            value = [[{
              type,
              value: json
            }]]
          } else if (Array.isArray(json)) {
            value = json.map(getStructure)
          } else if (type === 'object') {
            value = [getStructure(json)]
          }
        } catch (e) {
          value = [[{
            type: 'string',
            value
          }]]
        }
      } else if (data.type === 'boolean') {
        value = !(value === 'false' || value === '')
      }
      this.datas.push({
        name: data.name,
        type: data.type,
        value
      })
      this.dialog = false
      this.bindSortable()
    },
    onSubmit() {
      var data = {}
      this.datas.forEach(item => {
        if (item.type === 'array') {
          data[item.name] = item.value.map(item => {
            if (item.length === 1 && !item[0].name) {
              item = item[0]
              if (item.type === 'number') {
                return +item.value
              }
              return item.value
            } else {
              let data = {}
              item.forEach(item => {
                if (item.type === 'number') {
                  data[item.name] = +item.value
                } else {
                  data[item.name] = item.value
                }
              })
              return data
            }
          })
        } else if (item.type === 'number') {
          data[item.name] = Number(item.value)
        } else {
          data[item.name] = item.value
        }
      })
      saveData(this.name, data).then(() => {
        this.$toast('保存成功')
      })
    },
    addItem(item) {
      var data = JSON.parse(JSON.stringify(item[0]))
      data.forEach(item => {
        item.value = ''
      })
      item.push(data)
    }
  }
}
</script>

<style>
.my-handle {
  cursor: move;
  cursor: -webkit-grabbing;
}
.sortable-ghost {
  opacity: 0.5;
  background: #c8ebfb !important;
}
</style>
