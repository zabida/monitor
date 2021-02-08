<template>
  <el-card class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调用详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search_column">
      <div class="job_info_board">
        <div class="job_info_board_float">
          <div class="job_info_items">
            <span class="job_info_item_name">工单编号</span>
            <span class="job_info_item_value_1">&nbsp;&nbsp;{{ jobId ? jobId : '所有工单' }}</span>
          </div>
          <div class="job_info_items">
            <span class="job_info_item_name">统计时间</span><span
            class="job_info_item_value_1">&nbsp;&nbsp;{{ statisticsTime ? statisticsTime : '所有时间' }}</span>
          </div>
        </div>
        <div class="job_info_board_float">
          <div class="job_info_items">
            <span class="job_info_item_name">供方编号</span><span
            class="job_info_item_value_2">&nbsp;&nbsp;{{ supId ? supId : '所有供方' }}</span>
          </div>
          <div class="job_info_items">
            <span class="job_info_item_name">需方编号</span><span
            class="job_info_item_value_2">&nbsp;&nbsp;{{ demId ? demId : '所有需方' }}</span>
          </div>
        </div>
      </div>
      <div class="search_item">
        <span class="search_item_name">调用时间</span>
        <el-date-picker class="date-picker"
                        v-model="timeStartEnd"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="search_item">
        <span class="search_item_name">code</span>
        <el-input placeholder="code" v-model="code"></el-input>
      </div>
      <div class="search_item">
        <span class="search_item_name">msg</span>
        <el-input placeholder="msg" v-model="msg"></el-input>
      </div>
      <div class="search_item">
        <el-button class="search_bar" type="warning" circle icon="el-icon-search" size="small"
                   @click="getJobLog"></el-button>
      </div>
    </div>
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
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="pageSize"
                   :pager-count="5"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="count">
    </el-pagination>
  </el-card>
</template>

<script>
import { dateFormat, jobApi } from '@/api/api'

export default {
  name: 'jobDetail',
  data () {
    return {
      jobId: '',
      statisticsTime: '',
      demId: '',
      supId: '',
      code: '',
      msg: '',
      timeStartEnd: [],
      currentPage: 1,
      page: 1,
      pageSize: 10,
      count: 1,
      rowData: {
        request_time: '1998-01-02 12:01:21',
        job_id: '',
        dem_id: '',
        sup_id: '',
        code: '',
        msg: ''
      },
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  mounted () {
    const params = this.$router.currentRoute.value.params
    this.jobId = params.job_id
    this.statisticsTime = params.statistics_time
    this.demId = params.dem_id
    this.supId = params.sup_id
    this.timeStartEnd = params.timeStartEnd ? params.timeStartEnd : []
    this.getJobLog()
  },
  methods: {
    getJobLog () {
      const startTime = this.timeStartEnd.length === 0 ? '' : dateFormat('YYYY-mm-dd HH:MM:SS', this.timeStartEnd[0])
      const endTime = this.timeStartEnd.length === 0 ? '' : dateFormat('YYYY-mm-dd HH:MM:SS', this.timeStartEnd[1])
      const params = {
        start_time: startTime,
        end_time: endTime,
        job_id: this.jobId,
        code: this.code,
        msg: this.msg,
        page: this.page,
        page_size: this.pageSize
      }
      jobApi.get_job_log(params).then(value => {
        this.tableData = value.data.results
        this.count = value.data.count
      })
    },
    handleDetail (rowIndex, rowData) {
      const data = {
        statistics_time: rowData.statistics_time,
        job_id: rowData.job_id,
        dem_id: rowData.dem_id,
        sup_id: rowData.sup_id
      }
      this.$router.push({
        name: '',
        params: data
      })
    },
    handleSizeChange (val) {
      this.page = Math.ceil(this.pageSize * this.page / val)
      this.pageSize = val
      this.getJobLog()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getJobLog()
    }
  }
}
</script>

<style scoped lang="scss">
.el-main {
  text-align: left;
}

.search_column {
  background-color: #F2F2F2;
  display: table;
  width: 100%;
  border-radius: 3px;
  margin-bottom: 20px;

  > .search_item {
    //background-color: #2087c5;
    margin: 5px 10px 10px 15px;
    float: left;

    span {
      display: inline-block;
      margin-right: 3px;
      color: #093252;
      font-weight: bold;

    }

    .el-input {
      width: 150px;
    }

    .search_bar {
      margin-top: 4px;
    }
  }
}

.button_span {
  color: #093252;
  font-size: 12px;
}

.job_info_board {
  display: table;
  margin-top: 8px;

  > .job_info_board_float {
    float: left;

    .job_info_items {
      line-height: 40px;
      margin-left: 15px;

      .job_info_item_name, .job_info_item_value_2, .job_info_item_value_1 {
        display: inline-block;
      }

      .job_info_item_value_1, .job_info_item_value_2 {
        color: #E6A23C;
        font-size: 16px;
        font-weight: normal;
      }

      .job_info_item_name {
        color: #093252;
        font-weight: bold;
      }

      .job_info_item_value_1 {
        width: 230px;
      }

      .job_info_item_value_2 {
        width: auto;
      }
    }
  }
}

//::v-deep {
//  .el-pager li.active {
//    color: #E6A23C;
//  }
//}
::v-deep(.el-pager li.active) {
  color: #E6A23C;
}
</style>
