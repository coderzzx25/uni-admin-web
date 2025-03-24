import { useState, useEffect } from 'react';
import { Form, message } from 'antd';

interface IUseSearchProps<T, U> {
  defaultSearchInfo: T; // 默认搜索条件
  fetchData: (searchInfo: T) => Promise<{ list: U[]; total: number }>; // 数据请求函数
}

interface IUseModalReturn<T, U> {
  form: any;
  data: U[];
  loading: boolean;
  total: number;
  searchInfo: T;
  onClickSearch: (values: T) => void;
  onClickReset: () => void;
  onPageChange: (page: number, size: number) => void;
  getDataList: () => Promise<void>;
}

const useSearch = <T, U>({ defaultSearchInfo, fetchData }: IUseSearchProps<T, U>): IUseModalReturn<T, U> => {
  const [form] = Form.useForm();
  const [data, setData] = useState<U[]>([]); // 表格数据
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [total, setTotal] = useState<number>(0); // 数据总数
  const [searchInfo, setSearchInfo] = useState<T>({ ...defaultSearchInfo }); // 复制默认搜索信息

  /**
   * 搜索
   * @param values 表单值
   */
  const onClickSearch = (values: T) => {
    setSearchInfo((prev) => ({
      ...prev,
      ...values,
      page: 1 // 重置页码
    }));
  };

  /**
   * 重置
   */
  const onClickReset = () => {
    form.resetFields();
    setSearchInfo({ ...defaultSearchInfo });
  };

  /**
   * 获取数据列表
   */
  const getDataList = async () => {
    setLoading(true);
    try {
      const res = await fetchData(searchInfo);
      setData(res.list);
      setTotal(res.total);
    } catch (error) {
      message.error(`获取数据失败${error}`);
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 分页变化
   * @param page 当前页码
   * @param size 每页条数
   */
  const onPageChange = (page: number, size: number) => {
    setSearchInfo((prev) => ({
      ...prev,
      page,
      size
    }));
  };

  // 监听 searchInfo 变化，自动获取数据
  useEffect(() => {
    getDataList();
  }, [searchInfo]);

  return {
    form,
    data,
    loading,
    total,
    searchInfo,
    onClickSearch,
    onClickReset,
    onPageChange,
    getDataList
  };
};

export default useSearch;
