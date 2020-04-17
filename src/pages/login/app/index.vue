<template>
  <div id="app">
    <div class="login-body">
      <div class="landing-module">
        <div class="login-type">
          <span class="pointer client active" >用户登陆</span>
        </div>
        <div class="username">
          <icon-svg class="icon" icon-class="yonghu" ></icon-svg>
          <input class="input" autocomplete="off" type="text" placeholder="请输入账号" v-model="username" >
        </div>
        <div class="password">
          <icon-svg class="icon" icon-class="mima" ></icon-svg>
          <input class="input" autocomplete="off" type="password" placeholder="请输入密码" v-model="password" >
        </div>
        <div v-if="verificationId" class="verification">
          <icon-svg class="icon" icon-class="quanxianguanli" ></icon-svg>
          <input class="input" autocomplete="off" type="text" placeholder="请输入验证码" v-model="verification" >
          <img class="pointer img" :src="verifyCodeImage" alt="">
        </div>
        <div class="remember-password">
          <el-checkbox v-model="rememberPassword" >记住密码</el-checkbox>
        </div>
        <div v-if="!verificationId" class="placeholder"></div>
        <div class="to-login">
          <el-button type="success" :disabled="unLogin" class="button" @click="login">登陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./app.js"></script>
<style src="./app.scss" lang="scss"></style>
