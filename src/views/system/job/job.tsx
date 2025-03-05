import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { BaseForm } from '@/components/BaseForm';
import jobFormConfig from './config';
import { FormInstance } from 'antd';

interface IProps {
  children?: ReactNode;
}

const job: FC<IProps> = () => {
  const onClickSearch = (form: FormInstance) => {
    const values = form.getFieldsValue();
    console.log(values);
  };
  const onClickReset = () => {
    console.log('reset');
  };

  return (
    <div>
      <BaseForm formConfig={jobFormConfig} handleFormSearch={onClickSearch} handleFormReset={onClickReset} />
    </div>
  );
};

export default memo(job);
