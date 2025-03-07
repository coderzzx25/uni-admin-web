import { IFormConfig } from '@/components/BaseForm/interface';

const jobFormConfig: IFormConfig = {
  formItem: [
    {
      type: 'input',
      label: 'SYSTEM.JOB.SEARCH_CONFIG.NAME.LABEL',
      name: 'name',
      placeholder: 'SYSTEM.JOB.SEARCH_CONFIG.NAME.PLACEHOLDER'
    },
    {
      type: 'select',
      label: 'SYSTEM.JOB.SEARCH_CONFIG.STATUS.LABEL',
      name: 'status',
      placeholder: 'SYSTEM.JOB.SEARCH_CONFIG.STATUS.PLACEHOLDER',
      allowClear: true,
      options: [
        { label: 'DATE_STATUS.ACTIVE', value: 1 },
        { label: 'DATE_STATUS.INACTIVE', value: 0 }
      ]
    }
  ]
};

const jobTableConfig = {
  columns: [
    {
      title: 'SYSTEM.JOB.TABLE_CONFIG.ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'SYSTEM.JOB.TABLE_CONFIG.NAME',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'SYSTEM.JOB.TABLE_CONFIG.CREATE_TIME',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: 'SYSTEM.JOB.TABLE_CONFIG.UPDATE_TIME',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: 'SYSTEM.JOB.TABLE_CONFIG.STATUS',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'SYSTEM.JOB.TABLE_CONFIG.ACTION',
      dataIndex: 'action',
      key: 'action'
    }
  ]
};
export { jobFormConfig, jobTableConfig };
