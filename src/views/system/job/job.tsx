import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { Form } from 'antd';
import { BaseForm } from '@/components/BaseForm';
import jobFormConfig from './config';

interface IProps {
  children?: ReactNode;
}

const job: FC<IProps> = () => {
  const [form] = Form.useForm();
  // const onClickSearch = () => {
  //   const values = form.getFieldsValue();
  //   console.log('values:', values);
  // };
  // const onClickReset = () => {
  //   form.resetFields();
  // };

  return (
    <div>
      <BaseForm formConfig={jobFormConfig} form={form} />
    </div>
  );
};

export default memo(job);
