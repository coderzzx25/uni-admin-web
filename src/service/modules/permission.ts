import request from '..';

export interface IGetPermissionRequest {
  page: number;
  size: number;
  name?: string;
  status?: number;
}

export interface IPermissionItem {
  id: number;
  roleId: number;
  menuId: number[];
  createTime: string;
  updateTime: string;
  status: number;
}

interface IGetPermissionResponse {
  list: IPermissionItem[];
  total: number;
}

export const getPermissionListAPI = (data: IGetPermissionRequest) => {
  return request.get<IGetPermissionResponse>({
    url: '/permission/list',
    params: data
  });
};

export interface ICreatePermissionRequest {
  roleId: number;
  menuId: number[];
  status: number;
}

export const createPermissionAPI = (data: ICreatePermissionRequest) => {
  return request.post({
    url: '/permission/create',
    data
  });
};

export interface IEditPermissionRequest {
  id: number;
  roleId: number;
  menuId: number[];
  status: number;
}

export const editPermissionAPI = (data: IEditPermissionRequest) => {
  return request.post({
    url: '/permission/edit',
    data
  });
};
