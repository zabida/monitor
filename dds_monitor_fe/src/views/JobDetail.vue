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
            <span class="job_info_item_name">工单编号</span><span
            class="job_info_item_value_1">&nbsp;&nbsp;jjjsjsjsjsjsjsjs</span>
          </div>
          <div class="job_info_items">
            <span class="job_info_item_name">统计时间</span><span class="job_info_item_value_1">&nbsp;&nbsp;2021-02-02 19:09:01</span>
          </div>
        </div>
        <div class="job_info_board_float">
          <div class="job_info_items">
            <span class="job_info_item_name">供方编号</span><span
            class="job_info_item_value_2">&nbsp;&nbsp;jjjsjsjsjsjsjsjs</span>
          </div>
          <div class="job_info_items">
            <span class="job_info_item_name">需方编号</span><span class="job_info_item_value_2">&nbsp;&nbsp;2021-02-02 19:09:01</span>
          </div>
        </div>
      </div>
      <div class="search_item">
        <span class="search_item_name">调用时间</span>
        <el-date-picker class="date-picker"
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="search_item">
        <span class="search_item_name">code</span>
        <el-input placeholder="code" v-model="input1"></el-input>
      </div>
      <div class="search_item">
        <span class="search_item_name">msg</span>
        <el-input placeholder="msg" v-model="input2"></el-input>
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
        <el-button
          size="mini"
          @click="handleDelete(scope.$index, scope.row)"><span class="button_span">链路追踪</span></el-button>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage4"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="10"
                   :pager-count="5"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="39000000">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'jobDetail',
  data () {
    return {
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      tableData: [
        {
          statistics_time: '1998-01-02 12:01:21',
          job_id: 'wuzsw',
          dem_id: 'ahjashjashajsahjs',
          sup_id: '',
          sum_use: '',
          success_rate: '',
          avg_cost: ''
        }
      ]
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
        color: #2E2E2E;
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

::v-deep {
  .el-pager li.active {
    color: #E6A23C;
  }
}
</style>
