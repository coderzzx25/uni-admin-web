import request from '..';

export interface IGetPositionListRequest {
  name?: string;
  status?: number;
}

export interface IPositionItem {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  status: number;
  parentId?: number;
  children?: IPositionItem[];
}

export const getAllPositionSelectAPI = () => {
  return request.get<IPositionItem[]>({
    url: '/position/list',
    params: {
      status: 1
    }
  });
};

/**
 * 获取职位列表
 * @param data - 请求参数
 * @returns - 职位列表
 */
export const getPositionListAPI = (data: IGetPositionListRequest) => {
  return request.get<IPositionItem[]>({
    url: '/position/list',
    params: data
  });
};

export interface IEditPositionRequest {
  id: number;
  name: string;
  parentId?: number;
  status: number;
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
  parentId?: number;
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
