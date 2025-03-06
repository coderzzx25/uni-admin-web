import { Tag } from 'antd';
import { IFormConfig } from '@/components/BaseForm/interface';

const jobFormConfig: IFormConfig = {
  formItem: [
    {
      type: 'input',
      label: '职位名',
      name: 'name',
      placeholder: '请输入职位名'
    },
    {
      type: 'select',
      label: '职位状态',
      name: 'status',
      placeholder: '请选择职位状态',
      allowClear: true,
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]
};

const jobTableConfig = {
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '职位名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (value: number) => (value === 1 ? <Tag color="green">启用</Tag> : <Tag color="red">禁用</Tag>)
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action'
    }
  ]
};
export { jobFormConfig, jobTableConfig };
