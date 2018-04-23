<template>
  <div>
    <div ref="term"></div>
    <v-btn color="error" @click="clear">清空</v-btn>
    <v-layout>
      <v-select v-model="command" :items="commandList" label="常用命令" autocomplete item-value="value" item-text="text" multiple>
        <template slot="selection" slot-scope="data">
          <v-chip close @input="data.parent.selectItem(data.item)" :selected="data.selected" class="chip--select-multi" :key="JSON.stringify(data.item)">
            {{ data.item.group + '-' + data.item.text }}
          </v-chip>
        </template>
        <template slot="item" slot-scope="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content v-text="data.item"></v-list-tile-content>
          </template>
          <template v-else>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.text"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar @click.stop="edit(data.item)">
              编辑
            </v-list-tile-avatar>
          </template>
        </template>
      </v-select>
      <v-btn color="cyan" @click="action" :disabled="!command.length">执行</v-btn>
      <v-dialog v-model="dialog" persistent>
        <v-btn color="primary" dark slot="activator">添加常用命令</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">添加常用命令</span>
          </v-card-title>
          <v-card-text>
            <v-select :items="categories" v-model="newcommand.category" label="类别" autocomplete></v-select>
            <v-text-field label="名称" v-model.trim="newcommand.text" required></v-text-field>
            <v-text-field label="命令" v-model.trim="newcommand.value" required multi-line></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog=false">关闭</v-btn>
            <v-btn color="blue darken-1" flat @click.native="add" :disabled="!newcommand.value">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" max-width="500px">
        <v-btn color="primary" dark slot="activator">添加类别</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">添加类别</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="类别" v-model.trim="category" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog2=false">关闭</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addCategory" :disabled="!category">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import { fetchInfo } from '../../api/ssh'
import { Terminal } from 'xterm'
import io from 'socket.io-client'
import 'xterm/dist/xterm.css'

export default {
  data() {
    return {
      dialog: false,
      newcommand: {
        category: '',
        text: '',
        value: ''
      },
      command: [],
      commandList: [],
      term: null,
      socket: null,
      category: '',
      dialog2: false,
      editData: null,
      originalList: []
    }
  },
  created() {
    var commandList = localStorage.getItem('commandList')
    if (commandList) {
      this.originalList = JSON.parse(commandList)
      this.updateList()
    }
  },
  async mounted() {
    // console.log(getScript, fetchInfo)
    var data = await fetchInfo(this.$route.params.id)
    this.start(data)
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
    if (this.term) {
      this.term.destroy()
    }
  },
  methods: {
    updateList() {
      this.commandList = [].concat(...this.originalList
        .map(item => [{ header: item.name }]
          .concat(item.children.map(_item => Object.assign(_item, { group: item.name })))))
    },
    start(data) {
      var ele = this.$refs.term
      var term = this.term = new Terminal({
        cursorBlink: true
      });
      var socket = this.socket = io.connect(process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000');
      socket.on('connect', e => {
        socket.emit('login', data)
        socket.once('success', () => {
          term.writeln('登录成功-_-')
        })
      })
      socket.on('message', d => {
        term.write(d);
      })
      socket.once('failed', d => {
        term.writeln('登录失败-**-')
        term.write(d);
      })
      term.open(ele, true);
      term.writeln('欢迎使用!!!');
      term.writeln('正在登录服务器...');
      /* term.on('paste', data => {
        socket.send(data)
      })
      term.on('key', (key, ev) => {
        socket.send(key)
      }); */
      term.on('data', data => {
        socket.send(data)
      })
    },
    clear() {
      if (this.term) {
        this.term.reset();
        this.term.focus();
      }
    },
    add() {
      this.dialog = false;
      let item = this.originalList.find(item => item.name === this.newcommand.category)
      if (this.editData) {
        let _item = this.originalList.find(item => item.name === this.editData.group)
        Object.assign(this.editData, this.newcommand)
        if (item !== _item) {
          let i = _item.children.findIndex(item => item.name === this.editData.group)
          _item.children.splice(i, 1)
          item.children.push(this.editData)
        }
        this.editData = null
      } else {
        item.children.push({
          text: this.newcommand.text,
          value: this.newcommand.value
        })
      }
      this.updateList()
      this.newcommand.text = ''
      this.newcommand.value = ''
      this.saveCommand()
    },
    saveCommand() {
      localStorage.setItem('commandList', JSON.stringify(this.originalList.map(item => ({
        name: item.name,
        children: item.children.map(item => ({
          text: item.text,
          value: item.value
        }))
      }))))
    },
    action() {
      if (this.socket) {
        this.socket.send(this.command.join('\n') + '\n')
      }
    },
    edit(item) {
      this.newcommand.category = item.group
      this.newcommand.text = item.text
      this.newcommand.value = item.value
      this.editData = item
      this.dialog = true
    },
    addCategory() {
      this.commandList.push({
        header: this.category
      })
      this.originalList.push({
        name: this.category,
        children: []
      })
      this.category = ''
      this.saveCommand()
    }
  },
  computed: {
    categories() {
      return this.originalList.map(item => item.name)
    }
  }
}
</script>