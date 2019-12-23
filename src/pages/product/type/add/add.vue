<template>
  <div>
    <TypeDetail :is-edit="false"></TypeDetail>
  </div>
</template>

<script>
import TypeDetail from 'pages/product/type/components/typeDetail'
export default {
  name: 'type_add',
  components: {
    TypeDetail
  }
}
</script>

<style>

</style>