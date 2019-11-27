<template>
  <div class="loading" v-if="show">
    <div class="loading_text_box">
      <Icon type="ios-loading" class="loading_animation" size="30" :color="color" />
      <div class="loading_text" :style="{color}">{{text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    text: {
      type: String,
      default: '上传中'
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      
    }
  },
//  methods: {
//   showLoading() {
//       this.show = true
//     },
//     hideLoading() {
//       this.show = false
//     }
//   }
}
</script>

<style lang="less" scoped>
@prefix: loading;
.@{prefix} {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,.9);
  &_text_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
  }
  &_text {
    margin-top: 5px;
  }
  .loading_animation{
    animation: ani-demo-spin 1s linear infinite;
  }
}
</style>