<template>
  <div>
    <AttrDetail :is-edit="true"></AttrDetail>
  </div>
</template>

<script>
import AttrDetail from 'pages/product/attr/components/attrDetail'
export default {
  name: 'attr_edit',
  components: {
    AttrDetail
  }
}
</script>

<style>

</style>