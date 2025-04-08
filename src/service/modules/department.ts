import request from '..';

interface IGetDepartmentListRequest {
  name?: string;
  status?: number;
  isTree?: boolean;
}

export interface IGetDepartmentListResponse {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  status: number;
  parentId?: number;
  children?: IGetDepartmentListResponse[];
}

export const getDepartmentListAPI = (data: IGetDepartmentListRequest) => {
  return request.get<IGetDepartmentListResponse[]>({
    url: '/department/list',
    params: data
  });
};

export const getAllDepartmentSelectAPI = () => {
  return request.get<IGetDepartmentListResponse[]>({
    url: '/department/list',
    params: {
      status: 1
    }
  });
};

export const getAllDepartmentAPI = () => {
  return request.get<IGetDepartmentListResponse[]>({
    url: '/department/list',
    params: {
      isTree: true
    }
  });
};

export interface ICreateDepartmentRequest {
  name: string;
  parentId?: number;
  status: number;
}
export const createDepartmentAPI = (data: ICreateDepartmentRequest) => {
  return request.post({
    url: '/department/create',
    data
  });
};

export interface IEditDepartmentRequest {
  id: number;
  name: string;
  parentId?: number;
  status: number;
}

export const editDepartmentAPI = (data: IEditDepartmentRequest) => {
  return request.post({
    url: '/department/edit',
    data
  });
};
