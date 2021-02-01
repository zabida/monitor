<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/img/brand_.png" alt="公司图标">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api/api'

export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'user',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 12,
            message: '长度在3到12个字符',
            trigger: 'blur'
          }
        ],
        // 验证密码是否合法
        password: [
          {
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '长度在6到20个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        const obj = {
          nickname: this.loginForm.username,
          password: this.loginForm.password
        }
        console.log(1, this.$store.state.user)
        loginApi.login(obj).then(value => {
          this.$store.commit('user.set_token', value.data.token)
          this.$store.commit('user.set_username', value.data.nickname)
        })
      })
      // this.$refs.loginFormRef.validate((valid) => {
      //   if (valid) {
      //     const obj = {
      //       nickname: this.loginForm.username,
      //       password: this.loginForm.password,// this.$md5(this.form.pwd)  md5引用有问题，要看一下为啥嘞
      //     }
      //     loginApi.login(obj)
      //       .then((v) => {
      //         if (v.status === 200) {
      //           // 设置token，userinfo
      //           this.$store.commit('modules/set_token', v.data.token)
      //           this.$store.commit('modules/set_username', v.data.nickname)
      //           this.$store.commit('modules/set_realname', v.data.nickname)
      //           this.$router.push({ path: '/home' })
      //         } else {
      //           this.$message.error(v.msg)
      //         }
      //       })
      //   } else {
      //     this.$message.error('校验失败！')
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  background-image: url("../assets/img/Chinadep_login.jpg");
  height: 100%;
  width: 100%;
}
.login_container {
  background-image: url("../assets/img/Chinadep_login.jpg");
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 10%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
