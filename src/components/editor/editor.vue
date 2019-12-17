<template>
    <div class="editor_warpper">
      <span :class="['editor_label', {editor_vali : required}]" :style="
      {width: `${labelWidth}px`}
      ">{{label}}</span>
      <div class="editor_edit" ref="editor"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'

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
      data () {
        return {
          editorContent: ''
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        }
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
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

  &edit {
    width: 50%;
  }
  
}
</style>
