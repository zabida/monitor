<template>
  <el-row :gutter="15">
    <el-col :span="10">
      <el-card class="box-card">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
        </el-breadcrumb>
        <!--    <div class="my_table_header"><span>工单调用</span></div>-->
        <span class="header_span">工单调用</span>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50"
              :index="indexMethod">
            </el-table-column>
            <el-table-column
              prop="job_id"
              label="工单"
              width="250"
              align="center">
            </el-table-column>
            <el-table-column
              prop="sum_use"
              label="调用量"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="success_rate"
              label="成功率"
              width="100"
              sortable
              align="center">
            </el-table-column>
            <el-table-column align="center">
              <template #default="scope">
                <el-button size="mini" @clieck="handle(scope)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          :pager-count="5"
          layout="total, prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-card>
        <div id="main" style="width: 100%;height:400px;">
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { jobApi } from '@/api/api'
// import _ from 'lodash'
import * as echarts from 'echarts'

export default {
  name: 'dashboard',
  data () {
    return {
      page: 1,
      pageSize: 10,
      count: 1,
      currentPage: 1,
      order: '',
      tableData: []
    }
  },
  mounted () {
    this.getJobStatisticsLatest()
    this.myEcharts()
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    getJobStatisticsLatest () {
      const params = {
        page: this.page,
        page_size: this.pageSize
      }
      jobApi.get_job_statistics_latest(params).then(value => {
        this.tableData = value.data.results
        this.count = value.data.count
      })
    },
    handleSizeChange (val) {
      this.page = Math.ceil(this.pageSize * this.page / val)
      this.pageSize = val
      this.getJobStatisticsLatest()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getJobStatisticsLatest()
    },
    myEcharts () {
      const myChart = echarts.init(document.getElementById('main'))
      const option = {
        color: ['#5470C6', '#EE6666'],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['蒸发量', '平均温度']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '蒸发量',
            min: 0,
            max: 250,
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: {
                color: ['#5470C6', '#EE6666'][0]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: {
                color: ['#5470C6', '#EE6666'][1]
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      }

      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">

.box-main-left {
  width: 720px;
}

.header_span {
  display: block;
  color: #093252;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
}

::v-deep(.el-pager li.active) {
  color: #E6A23C;
}
</style>
