<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/img/brand_.png" alt="暂无图片">
        <span>工单监控管理系统</span>
      </div>
      <el-button type="warning" @click="logout" size="small">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :uniqueOpened="true"
          :default-active=$route.path
          class="el-menu-vertical-demo"
          background-color="#1E263E"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
          <el-submenu index="1">
            <template #title>
              <!--              <i class="el-icon-location"></i>-->
              <span>首页</span>
            </template>
            <el-menu-item :index="obj.path" :key="index" v-for="(obj, index) in aside_menu_li">
              <template #title>
                <span>{{ obj.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      aside_menu_li: [
        {
          path: '/dashBoard',
          name: 'Dashboard'
        },
        {
          path: '/jobList',
          name: '工单列表'
        },
        {
          path: '/jobDetail',
          name: '调用详情'
        },
        {
          path: '/monitor',
          name: '报错监控'
        }
      ]
    }
  },
  methods: {
    logout () {
      this.$store.commit('user/set_token', '')
      this.$store.commit('user/set_user', '')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped lang="scss">
.home-container {
  height: 100%;
}

.el-header {
  background-color: #093252;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 18px;

  > div {
    display: flex;
    align-items: center;

    img {
      padding-left: 15px;
      width: 30px;
    }

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #1E263E;
  color: #333;
  height: 100%;
  //text-align: center;
  line-height: 20px;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  height: 100%;
  //text-align: center;
  //line-height: 160px;
}

</style>
