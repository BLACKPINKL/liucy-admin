
<script>
import {Icon} from 'iview' 
  export default {
    name: 'menu_title',
    functional: true,
    props: {
      meta: {
        type: Object,
        default: () => ({})
      }
    },
    render(h, context) {
      let vnode = []
      if(context.props.meta) {
        vnode.push(
          <Icon type={context.props.meta.icon}/>,
          <span>{context.props.meta.title}</span>
        )
      }
      return vnode
    }
  }
</script>

<style lang="less" scoped>

</style>