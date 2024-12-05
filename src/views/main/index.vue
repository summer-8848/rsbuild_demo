<script lang="ts" setup>
import { useUserStore } from '@stores/userStore';

const store = useUserStore();
store.init();
const handleLogin = () => {
  store.sendLogin();
  store.getUser();
};
</script>

<template>
  <van-button type="primary" @click="handleLogin">登录</van-button>
  <van-divider />
  参数：{{ store.getParams() }}
  <van-divider />
  用户信息：{{ store.getUserInfo() }}
</template>
