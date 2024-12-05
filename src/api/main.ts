import request from '@/utils/request';

export function login(data: LoginParams) {
  return request<AuthInfo>({
    url: '/auth/login',
    method: 'post',
    data
  });
}

// 获取用户信息
export function getUserDetail() {
  return request<UserInfo>({
    url: '/auth/user_detail',
    method: 'get'
  });
}
