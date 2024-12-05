import { getUserDetail, login } from '@/api/main';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

export const useUserStore = defineStore('userStore', () => {
  const userInfo = reactive<UserInfo>({
    aaa_user_id: '',
    email: '',
    full_name: '',
    gender: 0,
    mobile: '',
    nick_name: '',
    username: ''
  });

  const params = reactive<Params>({
    username: '',
    aaa_user_id: '',
    id: 0
  });

  function init() {
    params.username = '';
    params.aaa_user_id = '';
    params.id = 0;

    parseParams();
  }

  function parseParams() {
    const route = useRoute();
    const encoded = route.query?.p;

    const a = {
      username: 'test',
      aaa_user_id: 'id_1150',
    };

    // base64加密
    const encodedParams = btoa(JSON.stringify(a));
    console.log(encodedParams);

    if (!encoded) {
      throw new Error('参数解析异常!');
    }
    try {
      const decoded = atob(typeof encoded === 'string' ? encoded : encoded.toString());
      const parsedParams = JSON.parse(decoded);
      params.username = parsedParams.username;
      params.aaa_user_id = parsedParams.aaa_user_id;
      params.id = parsedParams.id;
    } catch (e) {
      throw new Error('参数解析异常!!');
    }
  }

  async function sendLogin() {
    const loginParams: LoginParams = {
      username: params.username,
      aaa_user_id: params.aaa_user_id,
      type: 'dingtalk'
    };
    const data = await login(loginParams);
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  async function getUser() {
    const data = await getUserDetail();
    userInfo.aaa_user_id = data.aaa_user_id;
    userInfo.email = data.email;
    userInfo.full_name = data.full_name;
    userInfo.gender = data.gender;
    userInfo.mobile = data.mobile;
    userInfo.nick_name = data.nick_name;
    userInfo.username = data.username;
  }

  function getUserInfo() {
    return userInfo;
  }

  function getParams() {
    return params;
  }

  return {
    init,
    getUser,
    getParams,
    sendLogin,
    getUserInfo
  };
});
