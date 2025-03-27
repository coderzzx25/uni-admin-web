import request from '..';

export interface IGetAllInternationalResponse {
  [key: string]: Record<string, string>;
}

export const getAllInternationalAPI = () => {
  return request.get<IGetAllInternationalResponse>({
    url: '/international/lang',
    params: {
      timestamp: Date.now()
    }
  });
};

interface IGetInternationalListRequest {
  name?: string;
  status?: number;
}

export interface IInternationalItem {
  id: number;
  name: string;
  parentId: number;
  zhCN: string;
  enUS: string;
  founder: number;
  createTime: number;
  updateTime: number;
  status: number;
  children?: IInternationalItem[];
}

interface IGetInternationalListResponse {
  list: IInternationalItem[];
  total: number;
}

export const getInternationalListAPI = (data: IGetInternationalListRequest) => {
  return request.get<IGetInternationalListResponse>({
    url: '/international/list',
    params: data
  });
};

export const getInternationalSelectAPI = () => {
  return request.get<IInternationalItem[]>({
    url: '/international/list'
  });
};

export interface ICreateInternationalRequest {
  name: string;
  status: number;
  parentId?: number;
  zhCN?: string;
  enUS?: string;
}
export const createInternationalAPI = (data: ICreateInternationalRequest) => {
  return request.post({
    url: '/international/create',
    data
  });
};

export interface IEditInternationalRequest {
  id: number;
  name: string;
  status: number;
  parentId?: number;
  zhCN?: string;
  enUS?: string;
}

export const editInternationalAPI = (data: IEditInternationalRequest) => {
  return request.post({
    url: '/international/edit',
    data
  });
};
