import TblHeader from './header'
export default {
  name: 'Tbl',
  components: { TblHeader },
  props: {
    data: Array,
    border: {
      type: Boolean,
      default: false,
    },
    spanMethod: Function,
    showSummary: Boolean,
    summaryMethod: Function,
  },
  data() {
    return {
      column: [],
      originCol: [],
    }
  },
  // beforeCreate() {
  //   console.log('beforeCreate')
  // },
  // created() {
  //   console.log('created')
  // },
  // beforeMount() {
  //   console.log('beforeMount')
  // },
  mounted() {
    this.originCol = this.$slots.default
  },
  // beforeUpdate() {
  //   console.log('beforeUpdate')
  // },
  // updated() {
  //   console.log('updated')
  // },
  render(h) {
    let { data, column, spanMethod, showSummary, summaryMethod, border } = this
    let summaryRow = column.map(() => undefined)
    if (summaryMethod) {
      // console.log('summary', column)
      let summary = summaryMethod({ columns: column, data })
      for (let i = 0; i < summary.length; i++) {
        summaryRow[i] = summary[i]
      }
    } else {
      summaryRow[0] = '合计'
    }
    // console.log(column, summaryMethod)
    let tbody = data.map((row, rowIndex) => {
      return (
        <tr key={row.key}>
          {column.map((col, columnIndex) => {
            let rowspan = 1
            let colspan = 1
            if (spanMethod) {
              const spanData = spanMethod({
                row,
                column: col,
                rowIndex,
                columnIndex,
              })
              if (spanData) {
                if (spanData.map) {
                  rowspan = spanData[0]
                  colspan = spanData[1]
                } else {
                  rowspan = spanData.rowspan
                  colspan = spanData.colspan
                }
              }
            }
            if (!rowspan || !colspan) {
              return null
            }
            // add up same colum value if not present summaryMethod
            if (showSummary && !summaryMethod && columnIndex !== 0) {
              if (!isNaN(Number(row[col.property]))) {
                if (summaryRow[columnIndex])
                  summaryRow[columnIndex] += Number(row[col.property])
                else summaryRow[columnIndex] = Number(row[col.property])
              }
            }
            return h(
              'td',
              {
                style: { width: col.width + 'px' },
                attrs: { rowspan, colspan },
              },
              col.scopedSlot ? col.scopedSlot({ row }) : row[col.property]
            )
          })}
        </tr>
      )
    })
    return (
      <div class="tbl">
        <table
          style={{
            width: '100%',
          }}
          class={border ? 'border' : ''}
        >
          {/* must render it then you can get the col instance */}
          {this.$slots.default}
          <tbl-header column={this.originCol} />
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td class="no-data" colspan={column.length}>
                  暂无数据
                </td>
              </tr>
            ) : (
              tbody
            )}
          </tbody>
          {showSummary && data && data.length ? (
            <tfoot>
              <tr>
                {summaryRow.map((item) => {
                  return <td>{item}</td>
                })}
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    )
  },
}
