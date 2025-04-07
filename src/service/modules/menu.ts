import request from '..';

export interface IGetMenuListRequest {
  i18nName?: string;
  status?: number;
}

export interface IGetMenuListResponse {
  id: number;
  name: string;
  menuType: 'menus' | 'dir' | 'button';
  menuIcon: string;
  parentId?: number;
  permission: string;
  sort: number;
  path: string;
  i18nName: string;
  status: number;
  createTime: string;
  updateTime: string;
  children?: IGetMenuListResponse[];
}

export const getMenuListAPI = (data: IGetMenuListRequest) => {
  return request.get<IGetMenuListResponse[]>({
    url: '/menu/list',
    params: data
  });
};

export const getAllMenuSelectAPI = () => {
  return request.get<IGetMenuListResponse[]>({
    url: '/menu/list',
    params: {
      status: 1
    }
  });
};

export interface IGetAllMenuListResponse {
  id: number;
  menuType: 'menus' | 'dir' | 'button';
  parentId?: number;
  i18nName: string;
  name: string;
}
export const getAllMenuListAPI = () => {
  return request.get<IGetAllMenuListResponse[]>({
    url: '/menu/all'
  });
};

export interface ICreateMenuRequest {
  menuType: 'menus' | 'dir' | 'button';
  menuIcon?: string;
  parentId?: number;
  permission?: string;
  path?: string;
  i18nName?: string;
  status: number;
}

export const createMenuAPI = (data: ICreateMenuRequest) => {
  return request.post({
    url: '/menu/create',
    data
  });
};

export interface IEditMenuRequest {
  id: number;
  menuType: 'menus' | 'dir' | 'button';
  menuIcon?: string;
  parentId?: number;
  permission?: string;
  path?: string;
  i18nName?: string;
  status: number;
}

export const editMenuAPI = (data: IEditMenuRequest) => {
  return request.post({
    url: '/menu/edit',
    data
  });
};
