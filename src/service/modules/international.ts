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
  page: number;
  size: number;
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
