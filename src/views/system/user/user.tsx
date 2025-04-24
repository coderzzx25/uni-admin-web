import { BaseForm } from '@/components/BaseForm';
import { memo, useEffect, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { userSearchConfig, userTableConfig } from './config';
import useSearch from '@/hooks/useSearch/useSearch';
import { getUserListAPI, IGetUserListRequest, IUserItem } from '@/service/modules/user';
import { BaseTable } from '@/components/BaseTable';
import { Avatar, Button, Space, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { getAllPositionAPI, IPositionItem } from '@/service/modules/position';
import { getAllDepartmentAPI, IGetDepartmentListResponse } from '@/service/modules/department';
import { getAllRoles, IGetAllRolesResponse } from '@/service/modules/role';

interface IProps {
  children?: ReactNode;
}

const user: FC<IProps> = () => {
  const { t } = useTranslation();
  const { form, data, onClickSearch, onClickReset, onPageChange } = useSearch<IGetUserListRequest, IUserItem>({
    defaultSearchInfo: { page: 1, size: 10 },
    fetchData: getUserListAPI
  });

  const [positionList, setPositionList] = useState<IPositionItem[]>([]);
  const [departmentList, setDepartmentList] = useState<IGetDepartmentListResponse[]>([]);
  const [roleList, setRoleList] = useState<IGetAllRolesResponse[]>([]);

  useEffect(() => {
    getAllPositionAPI().then((res) => {
      setPositionList(res);
    });
    getAllDepartmentAPI().then((res) => {
      setDepartmentList(res);
    });
    getAllRoles().then((res) => {
      setRoleList(res);
    });
  }, []);

  const searchConfig = useMemo(
    () => ({
      ...userSearchConfig,
      formItems: userSearchConfig.formItems.map((item) => {
        if (item.name === 'positionId') {
          return {
            ...item,
            options: positionList.map((item) => ({ label: item.name, value: item.id }))
          };
        }
        if (item.name === 'departmentId') {
          return {
            ...item,
            options: departmentList.map((item) => ({ label: item.name, value: item.id }))
          };
        }
        if (item.name === 'roleId') {
          return {
            ...item,
            options: roleList.map((item) => ({ label: item.name, value: item.id }))
          };
        }
        return item;
      })
    }),
    [positionList, departmentList, roleList]
  );

  const childrenMap = {
    avatarUrl: ({ avatarUrl }: IUserItem) => <Avatar src={<img src={avatarUrl} alt="avatar" />} />,
    sex: ({ sex }: IUserItem) => (sex === 1 ? t('global.sex.male') : t('global.sex.female')),
    positionId: ({ positionId }: IUserItem) => {
      const positionItem = positionList.find((item) => item.id === positionId);
      return positionItem ? positionItem.name : '';
    },
    departmentId: ({ departmentId }: IUserItem) => {
      const departmentItem = departmentList.find((item) => item.id === departmentId);
      return departmentItem ? departmentItem.name : '';
    },
    roleId: ({ roleId }: IUserItem) => {
      const roleItem = roleList.find((item) => item.id === roleId);
      return roleItem ? roleItem.name : '';
    },
    action: () => (
      <Space>
        <Button size="small" type="primary">
          {t('global.table.action.edit')}
        </Button>
      </Space>
    ),
    status: ({ status }: IUserItem) =>
      status === 1 ? <Tag color="green">{t('global.active')}</Tag> : <Tag color="red">{t('global.inactive')}</Tag>
  };
  return (
    <>
      <BaseForm {...searchConfig} form={form} onSubmit={(values) => onClickSearch(values)} onReset={onClickReset}></BaseForm>
      <BaseTable
        {...userTableConfig}
        data={data}
        childrenMap={childrenMap}
        handleChangeSize={(page, size) => onPageChange(page, size)}
      ></BaseTable>
    </>
  );
};

export default memo(user);
