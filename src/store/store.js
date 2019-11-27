import Vuex from 'vuex'
import state from './state/state'
import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getter'
export default () => {
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  })
}
