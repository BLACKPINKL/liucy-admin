<template>
  <div>
     <Row>
        <Col :span="Math.ceil(24 / formTag.length)" v-for="item in formTag" :key="item.key">
          <Tag @click.native="handleClick(item)" color="primary">{{item.key}}</Tag>
        </Col>
    </Row>
    <Row>
      <Col>
        <Button @click="handleClickBtn">
          阿萨德
        </Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import { maker } from '@form-create/iview'
export default {
  name: 'devlop_form',
  data() {
    return {
      rule: [],
      formTag: [
        {key: '单行文本'},
        {key: '多行文本'},
        {key: '单选框'},
        {key: '多选框'},
        {key: '选择器'},
        {key: '日期时间选择器'},
      ]
    }
  },
  methods: {
    handleClick(item) {
      console.log('item');
      
    },
    handleClickBtn() {
      console.log('asdasd');
      
    }
  }
}
</script>

<style>

</style>