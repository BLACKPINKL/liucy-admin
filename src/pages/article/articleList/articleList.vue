<template>
  <div>
    <Table border :columns="columns" :data="data">
      <template slot-scope="{row}" slot="action">
        <Button type="success" size="small" style="margin-right: 5px" @click="handleArticleContent(row)">内容</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleArticleEdit(row)">编辑</Button>
        <Button type="error" size="small" @click="handleArticleRemove(row)">删除</Button>
      </template>
      <template slot-scope="{row}" slot="auth">
        
        {{getAuths(row.auth)}}
      </template>
      <template slot-scope="{row}" slot="thumb">
        <img :src="row.thumb" alt="">
      </template>
      <template slot-scope="{row}" slot="link_url">
        <div>
          <a v-if="row.link_url" :href="row.link_url" target="_blank">
            <Tag color="primary">{{row.link_url}}</Tag>
          </a>
          <span v-else>暂无外链</span>
        </div>
        
      </template>
      <template slot-scope="{row}" slot="show_top">
        {{ row.show_top == 1 ? '是' : '否' }}
      </template>
      <template slot-scope="{row}" slot="show_status">
        {{ row.show_status == 1 ? '显示' : '隐藏' }}
      </template>
    </Table> 
  </div>
</template>

<script>
import {HTMLDecode} from 'utils'
import commonMixin from 'utils/mixins'
import {getArticles} from 'service/article-service'
export default {
  name: 'article_list',
  mixins: [commonMixin],
  data() {
    return {
      data: [],
      columns: [
        {
          key: 'title',
          title: '标题'
        },
        {
          key: 'auth_name',
          title: '作者',
          slot: 'auth',

        },
        {
          key: 'description',
          title: '描述'
        },
        {
          key: 'keywords',
          title: '关键词'
        },
        {
          key: 'thumb',
          title: '封面',
          slot: 'thumb',
        },
        {
          key: 'link_url',
          title: '链接',
          slot: 'link_url',
        },
        {
          key: 'show_top',
          title: '文章置顶',
          slot: 'show_top'
        },
        {
          key: 'show_status',
          title: '状态',
          slot: 'show_status'
        },
        {
          key: 'action',
          title: '操作',
          slot: 'action'
        }
      ]
    }
  },
  created() {
    this.loadArticleList()
  },
  computed: {
    getAuths() {
      return function(arr) {
        let str = ''
         arr.forEach(item => {
          str += `${item.auth_name} `
        })
        return str
      }
    }
    
  },
  methods: {
    loadArticleList() {
      getArticles({}).then(res => {
        this.data = res.data
      })
    },
    // 查看内容
    handleArticleContent(row) {
      // 反转义html
      let content = HTMLDecode(row.content)
      console.log(content);
      
      this.modalInstance('info', `<p>${content}</p>`, () => {})
    },
    handleArticleEdit(row) {

    },
    handleArticleRemove(row) {

    },
  },
}
</script>

<style>

</style>