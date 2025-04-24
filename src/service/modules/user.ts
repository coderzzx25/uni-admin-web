import request from '..';

export interface IGetUserListRequest {
  page: number;
  size: number;
  username?: string;
  workNo?: string;
  cnName?: string;
  enName?: string;
  email?: string;
  phone?: string;
  status?: number;
  sex?: number;
  positionId?: number;
  departmentId?: number;
  roleId?: number;
}

export interface IUserItem {
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

interface IGetUserListResponse {
  list: IUserItem[];
  total: number;
}

export const getUserListAPI = (data: IGetUserListRequest) => {
  return request.get<IGetUserListResponse>({
    url: '/user/list',
    params: data
  });
};
