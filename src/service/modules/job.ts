import request from '..';

export interface IGetJobListRequest {
  page: number;
  size: number;
  name?: string;
  status?: number;
}

export interface IJobItem {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  status: number;
}

interface IGetJobListResponse {
  list: IJobItem[];
  total: number;
}

/**
 * 获取职位列表
 */
export const getJobListAPI = (data: IGetJobListRequest) => {
  return request.get<IGetJobListResponse>({
    url: '/job/list',
    params: data
  });
};
