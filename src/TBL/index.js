import Tbl from './Tbl'
import TblCol from './TblCol'

export default {
  install(Vue) {
    Vue.component('tbl', Tbl)
    Vue.component('tbl-col', TblCol)
    Vue.component('cpn-tbl', Tbl)
    Vue.component('cpn-tbl-col', TblCol)
  }
}
