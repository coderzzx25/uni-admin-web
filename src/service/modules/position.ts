import request from '..';

export interface IGetPositionListRequest {
  page: number;
  size: number;
  name?: string;
  status?: number;
}

export interface IPositionItem {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  status: number;
}

interface IGetPositionListResponse {
  list: IPositionItem[];
  total: number;
}

/**
 * 获取职位列表
 * @param data - 请求参数
 * @returns - 职位列表
 */
export const getPositionListAPI = (data: IGetPositionListRequest) => {
  return request.get<IGetPositionListResponse>({
    url: '/position/list',
    params: data
  });
};

interface IEditPositionRequest {
  id: number;
  name?: string;
  status?: number;
}

/**
 * 编辑职位
 * @param data - 请求参数
 * @returns - 编辑结果
 */
export const editPositionAPI = (data: IEditPositionRequest) => {
  return request.post({
    url: '/position/edit',
    data
  });
};

export interface ICreatePositionRequest {
  name: string;
  status: number;
}
/**
 * 创建职位
 * @param data - 请求参数
 * @returns - 创建结果
 */
export const createPositionAPI = (data: ICreatePositionRequest) => {
  return request.post({
    url: '/position/create',
    data
  });
};
