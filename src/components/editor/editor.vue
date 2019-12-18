<template>
  <div class="editor_warpper">
    <span :class="['editor_label', {editor_vali : required}]" :style="
      {width: `${labelWidth}px`}
      ">{{label}}</span>
    <div class="editor_box">
      <div class="editor_edit" :style="editorStyle" ref="editor">
      
      </div>
      <div v-show="showTips" class="editor_err_tip">请输入{{label}}</div>
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import config from 'config/env'
  export default {
    name: 'editor',
    props: {
      label: {
        type: [String, Number],
        default: ''
      },
      labelWidth: {
        type: [String, Number],
        default: 125
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // editorContent: ''
        editor: null,
        showTips: false
      }
    },

    mounted() {
      const editor = new E(this.$refs.editor)
      this.editor = editor
      // 绑定change事件
      editor.customConfig.onchange = (html) => {
        // 父组件绑定v-model  抛出value
        let value = this.showErrTip(html)
        this.$emit('input', html)
        
        
      }
      // blur事件
      editor.customConfig.onblur = (html) => {
        // html 即编辑器中的内容
        this.showErrTip(html)

      }
      // 根据当前环境变量开关debug模式
      editor.customConfig.debug = config.env === 'development'
      editor.customConfig.uploadImgServer = '/upload'
      editor.create()
    },
    computed: {
      // 编辑器自定义样式
      editorStyle() {
        return {
          'margin-bottom': '24px',
          border: '1px solid #dcdee2',
          'border-color': this.showTips ? 'rgb(237, 64, 20)' : '#dcdee2',
          transition: 'border-color .2s' 
        }
      }
    },

    methods: {
      // 设置内容
      setContent(content = '') {
        this.editor.txt.html(content)
      },
      clearContent() {
        this.editor.txt.clear()
      },
      showErrTip(html = '') {
        let empty = '<p><br></p>'
        // 如果当前required为必填 并且文本内容为空 (<p><br></p> 代表没有内容) 显示提示信息
        if (this.required && (html === empty || !html)){
          this.showTips = true
          return ''
        }
        else if (this.required && html !== empty) {
          this.showTips = false
          return html
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  @prefix: editor_;

  .@{prefix} {
    &warpper {
      display: flex;
      padding: 10px 0 10px 0;
      
    }

    &label {
      padding-right: 12px;
      display: inline-block;
      text-align: right;

    }

    &vali {
      &::before {
        content: '*';
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed4014;
      }
    }

    &box {
      position: relative;
    }
    &err_tip {
      position: absolute;
      bottom: 0;
      left: 0;
      line-height: 1;
      padding-top: 6px;
      color: #ed4014;
    }

  }
</style>