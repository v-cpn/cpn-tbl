<template>
  <div id="app">
    <h2>多级表头</h2>
    <tbl :data="tableData0" style="width: 100%">
      <tbl-col prop="date" label="日期" width="150"> </tbl-col>
      <tbl-col label="配送信息">
        <tbl-col prop="name" label="姓名" width="120"> </tbl-col>
        <tbl-col label="地址">
          <tbl-col prop="province" label="省份" width="120"> </tbl-col>
          <tbl-col prop="city" label="市区" width="120"> </tbl-col>
          <tbl-col prop="address" label="地址" width="300"> </tbl-col>
          <tbl-col prop="zip" label="邮编" width="120"> </tbl-col>
        </tbl-col>
      </tbl-col>
    </tbl>
    <h2>show-summary</h2>
    <tbl :data="tableData" border show-summary style="width: 100%">
      <tbl-col prop="id" label="ID" width="180"> </tbl-col>
      <tbl-col prop="name" label="姓名"> </tbl-col>
      <tbl-col prop="amount1" sortable label="数值 1"> </tbl-col>
      <tbl-col prop="amount2" sortable label="数值 2"> </tbl-col>
      <tbl-col prop="amount3" sortable label="数值 3"> </tbl-col>
    </tbl>
    <h2>summary-method</h2>
    <tbl
      :data="tableData"
      border
      height="200"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%; margin-top: 20px"
    >
      <tbl-col prop="id" label="ID" width="180"> </tbl-col>
      <tbl-col prop="name" label="姓名"> </tbl-col>
      <tbl-col prop="amount1" label="数值 1（元）"> </tbl-col>
      <tbl-col prop="amount2" label="数值 2（元）"> </tbl-col>
      <tbl-col prop="amount3" label="数值 3（元）"> </tbl-col>
    </tbl>
    <h2>span-method</h2>
    <tbl
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
    >
      <tbl-col prop="id" label="ID" width="180"> </tbl-col>
      <tbl-col prop="name" label="姓名"> </tbl-col>
      <tbl-col prop="amount1" sortable label="数值 1"> </tbl-col>
      <tbl-col prop="amount2" sortable label="数值 2"> </tbl-col>
      <tbl-col prop="amount3" sortable label="数值 3"> </tbl-col>
    </tbl>

    <tbl
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <tbl-col prop="id" label="ID" width="180"> </tbl-col>
      <tbl-col prop="name" label="姓名"> </tbl-col>
      <tbl-col prop="amount1" label="数值 1（元）"> </tbl-col>
      <tbl-col prop="amount2" label="数值 2（元）"> </tbl-col>
      <tbl-col prop="amount3" label="数值 3（元）"> </tbl-col>
    </tbl>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tableData0: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
      ],
      tableData: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
        },
        {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12,
        },
        {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
        },
        {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17,
        },
        {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15,
        },
      ],
    }
  },
  methods: {
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },

    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
  },
}
</script>

<style>
#app {
  margin: 20px 0;
}
</style>
