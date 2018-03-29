<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <v-text-field label="备注" v-model="msg"></v-text-field>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-text>
          <v-text-field label="前缀" v-model="preMsg"></v-text-field>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      msg: '',
      preMsg: ''
    }
  },
  created() {
    this.msg = localStorage.getItem('latestMsg') || '';
    this.preMsg = localStorage.getItem('latestPreMsg') || '';
  },
  watch: {
    msg(v) {
      localStorage.setItem('latestMsg', v);
    },
    preMsg(v) {
      localStorage.setItem('latestPreMsg', v);
    },
    v(v) {
      this.$emit('input', v);
    }
  },
  computed: {
    v() {
      var v = this.preMsg + this.msg;
      return v;
    }
  }
}
</script>

<style>

</style>
