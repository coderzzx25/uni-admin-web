import request from '..';

export interface IGetRoleListRequest {
  page: number;
  size: number;
  name?: string;
  status?: number;
}

export interface IRoleItem {
  id: number;
  name: string;
  code: string;
  describe: string;
  sort: number;
  createTime: string;
  updateTime: string;
  status: number;
}

interface IGetRoleListResponse {
  list: IRoleItem[];
  total: number;
}

export const getRoleListAPI = (data: IGetRoleListRequest) => {
  return request.get<IGetRoleListResponse>({
    url: '/role/list',
    params: data
  });
};

export interface ICreateRoleRequest {
  name: string;
  code?: string;
  describe?: string;
  status: number;
}

export const createRoleAPI = (data: ICreateRoleRequest) => {
  return request.post({
    url: '/role/create',
    data
  });
};

export interface IEditRoleRequest {
  id: number;
  name: string;
  code?: string;
  describe?: string;
  status: number;
}

export const editRoleAPI = (data: IEditRoleRequest) => {
  return request.post({
    url: '/role/edit',
    data
  });
};

export interface IGetAllRolesResponse {
  id: number;
  name: string;
}
export const getAllRoles = () => {
  return request.get<IGetAllRolesResponse[]>({
    url: '/role/all'
  });
};
