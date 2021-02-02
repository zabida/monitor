<template>
  <el-card class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my_table_header"><span>工单调用</span></div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="date"
          label="工单"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="调用量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="成功率"
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
    <div class="page_block">
      <el-pagination class="page_block_el"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="4000">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      tableData: [{
        date: '121212121212121212',
        name: '150',
        province: '上海',
        city: '普陀区',
        address: '98%'
      }, {
        date: '121212121212121212',
        name: '150',
        province: '上海',
        city: '普陀区',
        address: '98%'
      }, {
        date: '121212121212121212',
        name: '150',
        province: '上海',
        city: '普陀区',
        address: '98%'
      }, {
        date: '121212121212121212',
        name: '150',
        province: '上海',
        city: '普陀区',
        address: '96%'
      }, {
        date: '121212121212121212',
        name: '150',
        province: '上海',
        city: '普陀区',
        address: '97%'
      }, {
        date: '121212121212121212',
        name: '150',
        province: '上海',
        city: '普陀区',
        address: '98%'
      }
      ]
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    }
  }
}
</script>

<style scoped lang="scss">
.box-card {
  width: 780px;
}
.my_table_header {
  span {
    color: #2087c5;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 18px;
  }
}
.page_block {
  margin-top: 30px;
}
</style>
