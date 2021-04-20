<template>
  <el-row :gutter="15">
    <el-col :span="10">
      <el-card>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
        </el-breadcrumb>
        <span class="left_header_span">&nbsp;&nbsp;工单调用&nbsp;&nbsp;</span>
        <div>
          <el-table
            class="table_left"
            :data="tableLeftData"
            style="width: 100%"
            @sort-change="handleSortDash">
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
              sortable="custom"
              align="center">
            </el-table-column>
            <el-table-column
              prop="success_rate"
              label="成功率"
              width="100"
              sortable="custom"
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
          <div class="rate_select">
            <span class="rate_select_name">统计频率:</span>
            <el-select v-model="value" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

        </div>
        <div id="main" style="width: 100%;height:300px;"></div>
        <div class="report_button">
          <el-table
            :data="tableRightData"
            border
            @sort-change="handleSortHistory"
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
              sortable="custom"
              width="180">
            </el-table-column>
            <el-table-column
              align="center"
              prop="success_rate"
              sortable="custom"
              label="成功率">
            </el-table-column>
            <el-table-column
              align="center"
              prop="avg_cost"
              sortable="custom"
              label="平均耗时(毫秒)">
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
      value: '5',
      options: [{
        value: '5',
        label: '每5分钟'
      }, {
        value: '60',
        label: '每小时'
      }, {
        value: '1440',
        label: '每天'
      }, {
        value: '10080',
        label: '每周'
      }],
      syncTime: 5,
      page: 1,
      pageSize: 10,
      count: 1,
      currentPage: 1,
      origin_order: 'success_rate',
      order: '-success_rate',
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
        page_size: this.pageSize,
        order: this.order
      }
      jobApi.get_job_statistics_latest(params).then(value => {
        this.tableLeftData = value.data.results
        this.count = value.data.count
        this.tableLeftDataRow = value.data.results ? value.data.results[0] : []
        this.myEcharts(this.tableLeftDataRow ? this.tableLeftDataRow.job_id : '')
      })
    },
    handleSortDash (column) {
      this.order = (column.order === 'ascending' ? '' : '-') + (column.prop ? column.prop : this.origin_order)
      this.getJobStatisticsLatest()
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
        const color = ['#143f68', '#EE6666']
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
                show: false,
                readOnly: false
              },
              restore: { show: false },
              saveAsImage: { show: false }
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
              name: '调用量',
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
      }).catch(function (error) {
        console.log(23, error)
      })
    },
    handleDetailRight (scope) {
      const statisticsTime = scope.row.statistics_time
      console.log(18, statisticsTime)
      const stamp = Date.parse(statisticsTime.replace(/-/g, '/'))
      const startTime = dateFormat(
        'YYYY-mm-dd HH:MM:SS', new Date(stamp - 60 * this.syncTime * 1000))
      const endTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date(stamp))
      const data = {
        timeStartEnd: [startTime, endTime],
        jobId: scope.row.job_id,
        statisticsTime: statisticsTime
      }
      console.log(19, data)
      // 参数传不了时间对象，传了也会自动转为时间字符串
      this.$router.push({
        name: 'JobDetail',
        params: data
      })
    },
    handleSortHistory (columns) {
      const params = {
        order: ''
      }
      jobApi.get_job_statistics(params)
    },
    moreHistory () {
      const data = { jobId: this.tableLeftDataRow.job_id }
      this.$router.push({
        name: 'JobList',
        params: data
      })
    }
  }
}
</script>

<style scoped lang="scss">

::v-deep(.el-card) {
  min-height: 800px;
  position: relative;

  .el-pagination {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);

    .el-pager li.active {
      color: #E6A23C;
    }
  }

  .el-table.table_left {
    margin-top: 60px;
  }
}

.left_header_span {
  display: inline-block;
  position: absolute;
  left: 50%;
  line-height: 36px;
  transform: translateX(-50%);
  border-radius: 3px;
  background-color: #E9EEF3;
  color: #093252;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
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

  .rate_select {
    display: inline-block;
    float: right;
    margin: 5px 50px 0 0;
    font-size: 13px;

    .rate_select_name {
      display: inline-block;
      margin: 0 10px 0 0;
    }

    .el-select {
      width: 96px;
    }
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
