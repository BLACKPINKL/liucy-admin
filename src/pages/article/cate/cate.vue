<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option"></formCreate>
  </div>
</template>

<script>
import mixin from 'utils/mixins'
export default {
  name: 'article_cate',
  mixins: [mixin],
  data() {
    return {
      option: {
        onSubmit:(data) => {
          console.log(data);
          // TODO
        }
      }
    }
  },
  created() {
    this.loadForms('add_cate')
  },
  methods: {
    
  }
}
</script>

<style>

</style>