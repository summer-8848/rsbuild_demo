/** 用户信息 **/
interface UserInfo {
  aaa_user_id: string;
  email: string;
  full_name: string;
  gender: number;
  mobile: string;
  nick_name: string;
  username: string;
}

interface AuthInfo {
  access_token: string;
  refresh_token: string;
}
