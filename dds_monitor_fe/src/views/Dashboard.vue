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
                <el-button size="mini" @click="handleDetail(scope)">详情</el-button>
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
        <div id="main" style="width: 100%;height:300px;"></div>
        <div class="report_button">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              align="center"
              prop="request_time"
              label="调用时间"
              width="180">
            </el-table-column>
            <el-table-column
              align="center"
              prop="cost"
              label="耗时"
              width="180">
            </el-table-column>
            <el-table-column
              align="center"
              prop="code"
              label="code">
            </el-table-column>
            <el-table-column
              align="center"
              prop="msg"
              label="msg">
            </el-table-column>
            <el-table-column
              align="center"
              prop=""
              label="操作">
              <template #default="scope">
                <el-button
                  size="mini"
                  @click="handleDetail(scope.$index, scope.row)"><span class="button_span">链路追踪</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
// import _ from 'lodash'
import * as echarts from 'echarts'
import { jobApi } from '@/api/api'

export default {
  name: 'dashboard',
  data () {
    return {
      page: 1,
      pageSize: 10,
      count: 1,
      currentPage: 1,
      order: '',
      tableData: [],
      jobId: '',
      reportDataX: [],
      reportDataYNo: [],
      reportDataYRate: []
    }
  },
  mounted () {
    this.getJobStatisticsLatest()
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
        this.jobId = this.tableData[0].job_id
        this.myEcharts(this.jobId)
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
    handleDetail (scope) {
      this.jobId = scope.row.job_id
      this.myEcharts(this.jobId)
    },
    myEcharts (jobId) {
      const para = {
        job_id: jobId
      }
      jobApi.get_job_statistics_report(para).then(v => {
        console.log(123, v)
        const myChart = echarts.init(document.getElementById('main'))
        const color = ['#5470C6', '#EE6666']
        const option = {
          color: color,

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '10%'
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
            data: ['成功率', '调用量']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: v.data.data_x
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '成功率',
              min: 80,
              max: 110,
              position: 'left',
              axisLine: {
                show: true,
                lineStyle: {
                  color: color[0]
                }
              },
              axisLabel: {
                formatter: '{value}%'
              }
            },
            {
              type: 'value',
              name: '调用量(每10分钟)',
              min: 150,
              max: 200,
              position: 'right',
              axisLine: {
                show: true,
                lineStyle: {
                  color: color[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '成功率',
              type: 'bar',
              yAxisIndex: 0,
              data: v.data.data_y_rate
            },
            {
              name: '调用量',
              type: 'bar',
              yAxisIndex: 1,
              data: v.data.data_y_no
            }
          ]
        }
        console.log(1234, option)
        myChart.setOption(option)
      })
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
