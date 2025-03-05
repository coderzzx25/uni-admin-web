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
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]
};
export default jobFormConfig;
