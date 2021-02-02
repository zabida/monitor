<template>
  <el-card class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工作列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search_block">
      <span class="demonstration">统计时间</span>
      <el-date-picker class="date-picker"
        v-model="value1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input placeholder="工单编号" v-model="input1" size="mini"></el-input>
      <el-input placeholder="需方编号" v-model="input2" size="mini"></el-input>
      <el-input placeholder="供方编号" v-model="input3" size="mini"></el-input>
    </div>

  </el-card>
</template>

<script>
export default {
  name: 'jobList',
  data () {
    return {
      shortcuts: [{
        text: '最近一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })()
      }, {
        text: '最近一个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        })()
      }, {
        text: '最近三个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        })()
      }],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ''
    }
  }
}
</script>

<style scoped lang="scss">
.search_block {
  background-color: #F2F2F2;
  .date-picker {
    float: left;
  }
}

</style>
