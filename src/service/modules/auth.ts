import request from '..';

export interface IUserAccountLoginRequest {
  username: string;
  password: string;
  verifyCode: string;
}

export interface IUserAccountLoginResponse {
  token: string;
  refreshToken: string;
}

/**
 * 用户账号登录
 * @param data 登录信息
 * @returns 登录结果
 */
export const userAccountLoginAPI = (data: IUserAccountLoginRequest) => {
  return request.post<IUserAccountLoginResponse>({
    url: '/auth/account-login',
    data
  });
};

export interface IUserInfoResponse {
  id: number;
  username: string;
  workNo: string;
  cnName: string;
  enName: string;
  age: number;
  email: string;
  phone: string;
  avatarUrl: string;
  sex: number;
  status: number;
  positionId: number;
  departmentId: number;
  roleId: number;
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const userInfoAPI = () => {
  return request.get<IUserInfoResponse>({
    url: '/auth/user-info'
  });
};

export interface IUserMenuListResponse {
  id: number;
  menuType: string;
  menuIcon: string;
  parentId: number;
  permission: string;
  sort: number;
  path: string;
  i18nName: string;
  status: number;
  createTime: number;
  updateTime: number;
  children?: IUserMenuListResponse[];
}

/**
 * 获取用户菜单
 * @returns 用户菜单
 */
export const userMenuListAPI = () => {
  return request.get<IUserMenuListResponse[]>({
    url: '/auth/user-menu'
  });
};

/**
 * 刷新 token
 * @returns 新的 token
 */
export const refreshTokenAPI = (refreshToken: string) => {
  return request.get<IUserAccountLoginResponse>({
    url: '/auth/refresh-token',
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });
};
