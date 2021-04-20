<template>
  <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报错监控</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search_column">
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
        <span class="search_item_name">工单编号</span>
        <el-input placeholder="工单编号" v-model="jobId"></el-input>
      </div>
      <div class="search_item">
        <span class="search_item_name">供方编号</span>
        <el-input placeholder="供方编号" v-model="supId"></el-input>
      </div>
      <div class="search_item">
        <span class="search_item_name">需方编号</span>
        <el-input placeholder="需方编号" v-model="demId"></el-input>
      </div>
      <div class="search_item">
        <span class="search_item_name">code</span>
        <el-input placeholder="code" v-model="code"></el-input>
      </div>
      <div class="search_item">
        <el-button class="search_bar" type="warning" circle icon="el-icon-search" size="small"
                   @click="getJob"></el-button>
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
        label="调用时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="busi_serial_no"
        label="序列号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="job_id"
        label="工单编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="dem_id"
        label="需方编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="sup_id"
        label="供方编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="cost"
        label="耗时(毫秒)">
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
import { jobApi, dateFormat } from '@/api/api'

export default {
  name: 'jobList',
  data () {
    return {
      syncTime: 5,
      jobId: '',
      supId: '',
      demId: '',
      timeStartEnd: [],
      currentPage: 1,
      page: 1,
      pageSize: 10,
      count: 1,
      order: '-job_id',
      rowData: {
        job_id: '',
        dem_id: '',
        sup_id: '',
        sum_use: '',
        avg_cost: ''
      },
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  mounted () {
    this.tableData = this.getJob()
  },
  methods: {
    getJob () {
      const startTime = this.timeStartEnd.length === 0 ? '' : dateFormat('YYYY-mm-dd HH:MM:SS', this.timeStartEnd[0])
      const endTime = this.timeStartEnd.length === 0 ? '' : dateFormat('YYYY-mm-dd HH:MM:SS', this.timeStartEnd[1])
      const params = {
        start_time: startTime,
        end_time: endTime,
        dem_id: this.demId,
        sup_id: this.supId,
        job_id: this.jobId,
        page: this.page,
        page_size: this.pageSize,
        order: this.order
      }
      jobApi.get_job_log(params).then(value => {
        this.tableData = value.data.results
        this.count = value.data.count
      })
    },
    handleDetail (rowData) {
      const statisticsTime = rowData.statistics_time
      console.log(200, statisticsTime)
      const stamp = Date.parse(statisticsTime.replace(/-/g, '/'))
      const startTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date(stamp - 60 * this.syncTime * 1000))
      const endTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date(stamp))
      const data = {
        statisticsTime: statisticsTime,
        timeStartEnd: [startTime, endTime],
        jobId: rowData.job_id,
        demId: rowData.dem_id,
        supId: rowData.sup_id
      }
      console.log(201, data)
      this.$router.push({
        name: 'JobDetail',
        params: data
      })
    },
    handleSizeChange (val) {
      this.page = Math.ceil(this.pageSize * this.page / val)
      this.pageSize = val
      this.getJob()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getJob()
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
  .el-table {
    margin-bottom: 40px;
  }
}

.search_column {
  background-color: #F2F2F2;
  display: table;
  width: 100%;
  border-radius: 3px;
  margin-bottom: 20px;

  > .search_item {
    //background-color: #2087c5;
    margin: 10px 10px 10px 15px;
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

  > .search_item:nth-of-type(2) {
    .el-input {
      width: 250px;
    }
  }
}

.button_span {
  color: #093252;
  font-size: 12px;
}

</style>
