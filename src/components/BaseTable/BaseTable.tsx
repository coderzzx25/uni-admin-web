import { memo, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { Pagination, Table } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import BaseTableWrapper from './style';
import { useTranslation } from 'react-i18next';

interface IProps<T> {
  data: T[];
  columns: ColumnType<T>[];
  childrenMap?: Record<string, (record: T) => ReactNode>;
  loading?: boolean;
  pagination?: false | TablePaginationConfig;
  total?: number;
  handleChangeSize?: (page: number, pageSize: number) => void;
}

const BaseTable = <T extends object = any>({
  data,
  columns,
  childrenMap,
  total,
  loading,
  handleChangeSize
}: IProps<T>) => {
  const { t } = useTranslation();
  const [tableScroll, setTableScroll] = useState({ y: 0 });
  useEffect(() => {
    const updateTableScroll = () => {
      const availableHeight = window.innerHeight - 300;
      setTableScroll({ y: availableHeight });
    };

    updateTableScroll();
    window.addEventListener('resize', updateTableScroll);

    return () => {
      window.removeEventListener('resize', updateTableScroll);
    };
  }, []);
  return (
    <BaseTableWrapper>
      <Table
        dataSource={data}
        loading={loading}
        rowKey="id"
        bordered
        pagination={false}
        scroll={tableScroll}
        className="base-table"
      >
        {columns.map(({ key, dataIndex, title, render: columnRender, ...rest }) => {
          if (columnRender) {
            return (
              <Table.Column
                key={key}
                dataIndex={dataIndex}
                render={columnRender} // 使用 columns 中的 render
                title={t(title as string)}
                {...rest}
                align="center"
              />
            );
          }
          const children = childrenMap?.[dataIndex as string];
          if (children) {
            return (
              <Table.Column
                key={key}
                dataIndex={dataIndex}
                title={t(title as string)}
                {...rest}
                align="center"
                render={(text, record: T) => (children ? children(record) : text)}
              />
            );
          }
          return <Table.Column key={key} dataIndex={dataIndex} title={t(title as string)} {...rest} align="center" />;
        })}
      </Table>
      <Pagination
        total={total}
        showSizeChanger
        align="end"
        onChange={(page, pageSize) => handleChangeSize && handleChangeSize(page, pageSize)}
      />
    </BaseTableWrapper>
  );
};

export default memo(BaseTable) as typeof BaseTable;
