<template>
  <div>
    <TypeDetail :is-edit="true"></TypeDetail>
  </div>
</template>

<script>
import TypeDetail from 'pages/product/type/components/typeDetail'
export default {
  name: 'type_edit',
  components: {
    TypeDetail
  }
}
</script>

<style>

</style>