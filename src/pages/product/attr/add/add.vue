<template>
  <div>
    <AttrDetail :is-edit="false"></AttrDetail>
  </div>
</template>

<script>
import AttrDetail from 'pages/product/attr/components/attrDetail'
export default {
  name: 'attr_add',
  components: {
    AttrDetail
  }
}
</script>

<style>

</style>