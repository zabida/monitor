<template>
  <el-row :gutter="15">
    <el-col :span="10">
      <el-card class="box-card">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
        </el-breadcrumb>
        <!--    <div class="my_table_header"><span>工单调用</span></div>-->
        <span class="left_header_span">工单调用</span>
        <div>
          <el-table
            :data="tableLeftData"
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
                <el-button size="mini" @click="handleDetailLeft(scope)">详情</el-button>
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
        <div class="report_header">
          <span class="span_name">工单编号:</span><span class="span_value">{{ tableLeftDataRow.job_id }}</span>
          <span class="span_name">需方编号:</span><span class="span_value">{{ tableLeftDataRow.dem_id }}</span>
          <span class="span_name">供方编号:</span><span class="span_value">{{ tableLeftDataRow.sup_id }}</span>
        </div>
        <div id="main" style="width: 100%;height:300px;"></div>
        <div class="report_button">
          <el-table
            :data="tableRightData"
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
              prop="statistics_time"
              label="统计时间"
              width="180">
            </el-table-column>
            <el-table-column
              align="center"
              prop="sum_use"
              label="调用量"
              width="180">
            </el-table-column>
            <el-table-column
              align="center"
              prop="success_rate"
              label="成功率">
            </el-table-column>
            <el-table-column
              align="center"
              prop="avg_cost"
              label="平均耗时">
            </el-table-column>
            <el-table-column
              align="center"
              prop=""
              label="操作">
              <template #default="scope">
                <el-button
                  size="mini"
                  @click="handleDetailRight(scope)"><span class="button_span">详情</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span class="report_down_more" @click="moreHistory">更多历史&gt;</span>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
// import _ from 'lodash'
import * as echarts from 'echarts'
import { dateFormat, jobApi } from '@/api/api'

export default {
  name: 'dashboard',
  data () {
    return {
      syncTime: 5,
      page: 1,
      pageSize: 10,
      count: 1,
      currentPage: 1,
      order: '',
      myChart: null,
      tableLeftDataRow: {},
      tableLeftData: [],
      tableRightData: [],
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
        this.tableLeftData = value.data.results
        this.count = value.data.count
        this.tableLeftDataRow = value.data.results ? value.data.results[0] : []
        this.myEcharts(this.tableLeftDataRow ? this.tableLeftDataRow.job_id : '')
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
    handleDetailLeft (scope) {
      console.log(123, scope.row)
      this.tableLeftDataRow = scope.row
      this.myEcharts(scope.row.job_id)
    },
    myEcharts (jobId) {
      const para = {
        job_id: jobId
      }
      jobApi.get_job_statistics_report(para).then(v => {
        // console
        this.tableRightData = v.data.table
        const yNoMax = v.data.report ? Math.max(...v.data.report.data_y_no) : 400
        const yNoMaxShow = (parseInt(yNoMax / 100) + 1) * 100
        if (this.myChart) {
          this.myChart.dispose()
        }
        this.myChart = echarts.init(document.getElementById('main'))
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
              data: v.data.report.data_x
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '成功率',
              min: 0,
              max: 100,
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
              min: 0,
              max: yNoMaxShow,
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
              data: v.data.report.data_y_rate
            },
            {
              name: '调用量',
              type: 'bar',
              yAxisIndex: 1,
              data: v.data.report.data_y_no
            }
          ]
        }
        this.myChart.setOption(option)
      })
    },
    handleDetailRight (scope) {
      const statisticsTime = scope.row.statistics_time
      const stamp = Date.parse(statisticsTime.replace(/-/g, '/'))
      const startTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date(stamp - 60 * this.syncTime * 1000))
      const endTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date(stamp))
      const data = {
        timeStartEnd: [startTime, endTime],
        jobId: scope.row.job_id,
        statisticsTime: statisticsTime
      }
      // 参数传不了时间对象，传了也会自动转为时间字符串
      this.$router.push({ name: 'JobDetail', params: data })
    },
    moreHistory () {
      const data = { jobId: this.tableLeftDataRow.job_id }
      this.$router.push({
        name: 'JobList', params: data
      })
    }
  }
}
</script>

<style scoped lang="scss">

.box-main-left {
  width: 720px;
}

.left_header_span {
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

.report_header {
  text-align: left;
  .span_name {
    display: inline-block;
    margin: 0 5px 20px 0;
    font-weight: bold;
  }
  .span_value {
    display: inline-block;
    margin: 0 30px 20px 0;
    color: #E6A23C;
  }
}

.report_down_more {
  display: inline-block;
  float: right;
  cursor: pointer;
  font-size: 12px;
  color: #E6A23C;
  margin: 10px 0 10px 0;

}
</style>
