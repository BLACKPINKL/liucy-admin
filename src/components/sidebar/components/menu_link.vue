<template>
  <router-link :to="to">
    <slot></slot>  
  </router-link>
</template>

<script>
export default {
  name: 'menu_link',
  props: {
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>