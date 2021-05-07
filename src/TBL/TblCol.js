export default {
  props: {
    prop: String,
    label: String,
    width: String,
  },
  created() {
  },
  render(h) {
    let { label } = this
    let slot = this.$slots.default || this.$scopedSlots.default || label
    return h('col', typeof slot === 'function' ? slot({ row: {} }) : slot)
  }
}
