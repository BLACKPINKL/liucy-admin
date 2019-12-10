<template>
  <div :class="`${preFix}box`">
    <div class="fog__container">
      <!-- <vue-particles
        color="#ffffff"
        :particleOpacity="0.7"
        linesColor="#ffffff"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="5"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles> -->
        <div class="fog__img fog__img--first"></div>
        <div class="fog__img fog__img--second"></div>
    </div>
    <div :class="`${preFix}form`">
      <div :class="`${preFix}form_item`">
        <div :class="`${preFix}form_title`">
          系统登录
        </div>
      </div>
      <div :class="`${preFix}form_item`">
        <Input size="large" prefix="ios-contact" v-model="form.account " placeholder="Enter something..." style="width: 100%"/>
      </div>
      <div :class="`${preFix}form_item`">
        <Input size="large" @keyup.enter.native="handleSubmit" prefix="md-lock" type="password" v-model="form.password" placeholder="Enter something..." style="width: 100%" />
      </div>
      <div :class="`${preFix}form_item`">
        <Button @click="handleSubmit" type="primary" long size="large">登录</Button>
      </div>
      
    </div>
  </div>
</template>

<script>
import {setCookie, getCookie} from 'utils/cookie'
import {login} from 'service/user-service'
import md5 from 'blueimp-md5'
const preFix = 'login_'
export default {
  name: 'login',
  data() {
    return {
      preFix: preFix,
      // 表单
      form: {
        account: '',
        password: ''
      },
    }
  },
  
  methods: {
    // 点击登录按钮
    handleSubmit(e) {
      let form = this.form
      if(!form.account) return this.$Message.warning('请填写账号')
      if(!form.password) return this.$Message.warning('请填写密码')
      // md5 加密
      let md5Pass = md5(form.password).toUpperCase()
      // 登录请求
      this.userLogin({account: form.account, password: md5Pass})
    },
    userLogin(data) {
      login(data).then(res => {
        console.log('成功', res);
        let tokenData = res.data
        // 两小时过期时间
        let expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
        // 存入cookie
        setCookie('token', tokenData.token, {expires})
        // 跳转至首页
        this.$router.push({path: '/'})
        
      })
    }
    
  }
}
</script>

<style lang="less" scoped>
@preFix: login_;

.@{preFix}box {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background: url('../../assets/images/login2.jpg') no-repeat center/100% 100%;
}

.fog__container {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.fog__img {
    position: absolute;
    height: 100vh;
    width: 300vw;
}
.fog__img--first {
    background: url("../../assets/images/fog-1.png") repeat-x;
    background-size: contain;
    background-position: center;
    -webkit-animation: marquee 60s linear infinite;
    animation: marquee 60s linear infinite;
}
.fog__img--second {
    background: url("../../assets/images/fog-2.png") repeat-x;
    background-size: contain;
    background-position: center;
    -webkit-animation: marquee 40s linear infinite;
    animation: marquee 40s linear infinite;
}
@-webkit-keyframes marquee {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(-200vw, 0, 0);
    }
}
@keyframes marquee {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(-200vw, 0, 0);
    }
}

.@{preFix}form {
  width: 520px;
  margin: 0 auto;
  position: relative;
  padding: 200px 35px 0;
}
.@{preFix}form_bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.@{preFix}form_title {
  padding: 10px;
  color: #fff;
  font-size: 24px;
  text-align: center;
}
.@{preFix}form_item {
  width: 100%;
  margin: 10px 0;
}
.other {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
