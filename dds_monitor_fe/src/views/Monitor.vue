<template>
  <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报错监控</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search_column">
      <div class="search_item">
        <span class="search_item_name">统计时间</span>
        <el-date-picker class="date-picker"
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="search_item">
        <span class="search_item_name">供方编号</span>
        <el-input placeholder="供方编号" v-model="input1"></el-input>
      </div>
      <div class="search_item">
        <span class="search_item_name">需方编号</span>
        <el-input placeholder="需方编号" v-model="input2"></el-input>
      </div>
      <div class="search_item">
        <span class="search_item_name">工单号</span>
        <el-input placeholder="工单号" v-model="input2"></el-input>
      </div>
      <div class="search_item">
        <span class="search_item_name">code</span>
        <el-input placeholder="code" v-model="input2"></el-input>
      </div>
      <div class="search_item">
        <el-button class="search_bar" type="warning" circle icon="el-icon-search" size="small"></el-button>
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
        prop="statistics_time"
        label="统计时间"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="job_id"
        label="工单编号"
        width="180">
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
        prop="sum_use"
        label="调用量">
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
            @click="handleDetail(scope.row)"><span class="button_span">详情</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="10"
                   :pager-count="5"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="count">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'Monitor',
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
      count: 0,
      order: '-request_time',
      rowData: {
        request_time: '1998-01-02 12:01:21',
        job_id: '',
        dem_id: '',
        sup_id: '',
        code: '',
        msg: ''
      },
      tableData: []
    }
  },
  methods: {
    handleDetail (rowData) {},
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
  height: 800px;
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
}

.button_span {
  color: #093252;
  font-size: 12px;
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
