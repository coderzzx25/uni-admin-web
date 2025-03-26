import { BaseForm } from '@/components/BaseForm';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { internationalSearchConfig, internationalTableConfig } from './config';
import useSearch from '@/hooks/useSearch/useSearch';
import { getInternationalListAPI, IInternationalItem } from '@/service/modules/international';
import { BaseTable } from '@/components/BaseTable';

interface IProps {
  children?: ReactNode;
}

const international: FC<IProps> = () => {
  const { form, data } = useSearch({ defaultSearchInfo: { page: 1, size: 10 }, fetchData: getInternationalListAPI });
  return (
    <>
      <BaseForm {...internationalSearchConfig} form={form}></BaseForm>
      <BaseTable<IInternationalItem> {...internationalTableConfig} data={data}></BaseTable>
    </>
  );
};

export default memo(international);
