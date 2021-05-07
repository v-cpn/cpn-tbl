export default {
  props: {
    column: Array,
    deepestColUpdate: Function,
  },
  data() {
    return {
      toBeRender: [],
      maxLevel: 1,
      columnStamp: '',
    }
  },
  watch: {
    column: {
      handler() {
        if (!this.column) return
        let stamp = this.column
          .map(i => {
            if (!i.componentInstance) return ''
            return i.componentInstance._uid
          })
          .join('')
        if (this.columnStamp === stamp) {
          return
        } else {
          this.columnStamp = stamp
        }
        let toBeRender = []
        let deepestCol = []
        // adapt to element ui nested <el-table-column />
        let traverse = function traverse(vnodes, level) {
          let fullColspan = 0
          if (!toBeRender[level]) toBeRender[level] = []
          for (let i = 0; i < vnodes.length; i++) {
            let ins = vnodes[i].componentInstance
            if (!ins) return
            let colspan = 1
            let hadChild = false
            // assume $slots.default are all <tbl-col>
            // it means that custom slot should be a scoped slot even if it doesn't use scoped variable
            if (ins.$slots.default) {
              colspan = traverse(ins.$slots.default, level + 1)
              hadChild = true
            } else {
              deepestCol.push({
                property: ins.prop,
                label: ins.label,
                width: ins.width,
                slot: ins.$slots.default, // static
                scopedSlot: ins.$slots.default
                  ? null
                  : ins.$scopedSlots.default, // scoped
                instance: ins,
              })
            }
            fullColspan += colspan
            toBeRender[level].push({
              label: ins.label,
              colspan,
              hadChild,
            })
          }
          return fullColspan
        }
        traverse(this.column, 0)
        this.maxLevel = toBeRender.length
        this.toBeRender = toBeRender

        this.$parent.column = deepestCol
      },
    },
  },
  mounted() {},
  render() {
    let { maxLevel, toBeRender } = this
    return (
      <thead>
        {toBeRender.map((row, level) => {
          return (
            <tr>
              {row.map(col => {
                return (
                  <th
                    colspan={col.colspan}
                    rowspan={col.hadChild ? 1 : maxLevel - level}
                  >
                    {col.label}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
    )
  },
}
