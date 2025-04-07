import { BaseForm } from '@/components/BaseForm';
import useSearch from '@/hooks/useSearch/useSearch';
import {
  createPermissionAPI,
  editPermissionAPI,
  getPermissionListAPI,
  ICreatePermissionRequest,
  IEditPermissionRequest,
  IGetPermissionRequest,
  IPermissionItem
} from '@/service/modules/permission';
import { memo, useEffect, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { permissionModalConfig, permissionSearchConfig, permissionTableConfig } from './config';
import { Button, message, Modal, Space, Tag, Typography } from 'antd';
import { BaseTable } from '@/components/BaseTable';
import useModal from '@/hooks/useModal/useModal';
import { i18nPrefix } from '@/utils';
import { getAllRoles, IGetAllRolesResponse } from '@/service/modules/role';
import { getAllMenuListAPI, getAllMenuSelectAPI, IGetAllMenuListResponse, IGetMenuListResponse } from '@/service/modules/menu';

interface IProps {
  children?: ReactNode;
}
const { Text } = Typography;
const permission: FC<IProps> = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const { form, data, loading, onClickSearch, onClickReset, onPageChange, getDataList } = useSearch<IGetPermissionRequest, IPermissionItem>(
    {
      defaultSearchInfo: {
        page: 1,
        size: 10
      },
      fetchData: getPermissionListAPI
    }
  );

  const {
    isModalVisible,
    modalType,
    actionLoading,
    form: modelForm,
    handleSave,
    closeModal,
    openModal
  } = useModal<ICreatePermissionRequest, IEditPermissionRequest, IGetMenuListResponse[]>({
    onSave: async (values, id) => {
      if (id) {
        // 编辑
        try {
          await editPermissionAPI({
            id,
            ...values
          });
          closeModal();
        } catch (error) {
          const typedError = error as Error;
          messageApi.open({
            content: typedError.message,
            type: 'error'
          });
        }
      } else {
        // 创建
        try {
          await createPermissionAPI(values);
          closeModal();
        } catch (error) {
          const typedError = error as Error;
          messageApi.open({
            content: typedError.message,
            type: 'error'
          });
        }
      }
      await getDataList();
    },
    key: 'id'
  });

  const [roleList, setRoleList] = useState<IGetAllRolesResponse[]>([]);
  const [menuList, setMenuList] = useState<IGetAllMenuListResponse[]>([]);
  const [allMenuList, setAllMenuList] = useState<IGetAllMenuListResponse[]>([]);

  useEffect(() => {
    getAllRoles().then((res) => {
      setRoleList(res);
    });
    getAllMenuSelectAPI().then((res) => {
      setMenuList(res);
    });
    getAllMenuListAPI().then((res) => {
      setAllMenuList(res);
    });
  }, []);

  const searchConfig = useMemo(
    () => ({
      ...permissionSearchConfig,
      formItems: permissionSearchConfig.formItems.map((item) => {
        if (item.name === 'roleId') {
          return {
            ...item,
            options: roleList.map((item) => ({ label: item.name, value: item.id }))
          };
        }
        return item;
      })
    }),
    [roleList]
  );

  const modelConfig = useMemo(
    () => ({
      ...permissionModalConfig,
      formItems: permissionModalConfig.formItems.map((item) => {
        if (item.name === 'menuId') {
          return {
            ...item,
            treeData: menuList
          };
        }
        if (item.name === 'roleId') {
          return {
            ...item,
            options: roleList.map((item) => ({ label: item.name, value: item.id })),
            disabled: modalType === 'edit'
          };
        }
        return item;
      })
    }),
    [menuList, roleList, modalType]
  );

  const childrenMap = {
    roleId: ({ roleId }: IPermissionItem) => <Text>{roleList.find((item) => item.id === roleId)?.name}</Text>,
    menuId: ({ menuId }: IPermissionItem) => {
      const maxVisibleTags = 4;
      const visibleTags = menuId.slice(0, maxVisibleTags);
      const hasMore = menuId.length > maxVisibleTags;

      return (
        <>
          {visibleTags.map((item) => {
            const menuName = allMenuList.find((menu) => menu.id === item)?.name ?? '';
            return <Tag key={item}>{t(menuName)}</Tag>;
          })}
          {hasMore && <Tag>...</Tag>}
        </>
      );
    },
    action: (values: IPermissionItem) => (
      <Space>
        <Button size="small" type="primary" onClick={() => openModal(values)}>
          {t('global.table.action.edit')}
        </Button>
      </Space>
    ),
    status: ({ status }: IPermissionItem) =>
      status === 1 ? <Tag color="green">{t('global.active')}</Tag> : <Tag color="red">{t('global.inactive')}</Tag>
  };
  return (
    <>
      <BaseForm {...searchConfig} form={form} onSubmit={(values) => onClickSearch(values)} onReset={onClickReset}>
        <Button type="primary" color="cyan" variant="solid" onClick={() => openModal()}>
          {t('global.form.create')}
        </Button>
      </BaseForm>
      <BaseTable
        {...permissionTableConfig}
        data={data}
        loading={loading}
        childrenMap={childrenMap}
        handleChangeSize={(page, size) => onPageChange(page, size)}
      />
      <Modal
        title={modalType === 'create' ? t(i18nPrefix(pathname, 'model.title.create')) : t(i18nPrefix(pathname, 'model.title.edit'))}
        open={isModalVisible}
        confirmLoading={actionLoading}
        onOk={handleSave}
        onCancel={closeModal}
      >
        <BaseForm {...modelConfig} form={modelForm} layout="vertical"></BaseForm>
      </Modal>
      {contextHolder}
    </>
  );
};

export default memo(permission);
