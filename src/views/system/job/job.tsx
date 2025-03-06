import { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

import { Button, FormInstance, Space } from 'antd';
import { BaseForm } from '@/components/BaseForm';
import { jobFormConfig, jobTableConfig } from './config';
import { BaseTable } from '@/components/BaseTable';
import { getJobListAPI, IGetJobListRequest, IJobItem } from '@/service/modules/job';

interface IProps {
  children?: ReactNode;
}

const job: FC<IProps> = () => {
  const [data, setData] = useState<IJobItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [searchInfo, setSearchInfo] = useState<IGetJobListRequest>({
    page: 1,
    size: 10
  });
  const onClickSearch = (form: FormInstance) => {
    const values = form.getFieldsValue();
    setSearchInfo({
      page: 1,
      size: 10,
      ...values
    });
  };
  const onClickReset = (form: FormInstance) => {
    form.resetFields();
    setSearchInfo({
      page: 1,
      size: 10
    });
  };

  const getDataList = async () => {
    setLoading(true);
    const res = await getJobListAPI(searchInfo);
    setData(res.list);
    setTotal(res.total);
    setLoading(false);
  };
  useEffect(() => {
    getDataList();
  }, [searchInfo]);

  const childrenMap = {
    action: () => (
      <Space>
        <Button type="primary">编辑</Button>
        <Button type="primary" danger>
          删除
        </Button>
      </Space>
    )
  };

  return (
    <div>
      <BaseForm formConfig={jobFormConfig} handleFormSearch={onClickSearch} handleFormReset={onClickReset} />
      <BaseTable<IJobItem> {...jobTableConfig} data={data} loading={loading} childrenMap={childrenMap} total={total} />
    </div>
  );
};

export default memo(job);
