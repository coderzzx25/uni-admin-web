import { memo } from 'react';
import type { ReactNode } from 'react';

import { Pagination, Table } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import BaseTableWrapper from './style';

interface IProps<T> {
  data: T[];
  columns: ColumnType<T>[];
  childrenMap?: Record<string, (record: T) => ReactNode>;
  loading?: boolean;
  pagination?: false | TablePaginationConfig;
  total?: number;
}

const BaseTable = <T extends object = any>({ data, columns, childrenMap, total, loading }: IProps<T>) => {
  return (
    <BaseTableWrapper>
      <Table dataSource={data} loading={loading} rowKey="id" bordered pagination={false} className="base-table">
        {columns.map(({ key, dataIndex, render: columnRender, ...rest }) => {
          if (columnRender) {
            return (
              <Table.Column
                key={key}
                dataIndex={dataIndex}
                render={columnRender} // 使用 columns 中的 render
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
                {...rest}
                align="center"
                render={(text, record: T) => (children ? children(record) : text)}
              />
            );
          }
          return <Table.Column key={key} dataIndex={dataIndex} {...rest} align="center" />;
        })}
      </Table>
      <Pagination total={total} showSizeChanger align="end" />
    </BaseTableWrapper>
  );
};

export default memo(BaseTable) as typeof BaseTable;
