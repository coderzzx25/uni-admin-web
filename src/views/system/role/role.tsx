import { BaseForm } from '@/components/BaseForm';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { roleModalConfig, roleSearchConfig, roleTableConfig } from './config';
import useSearch from '@/hooks/useSearch/useSearch';
import {
  createRoleAPI,
  editRoleAPI,
  getRoleListAPI,
  ICreateRoleRequest,
  IEditRoleRequest,
  IGetRoleListRequest,
  IRoleItem
} from '@/service/modules/role';
import { Button, message, Modal, Space, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { BaseTable } from '@/components/BaseTable';
import useModal from '@/hooks/useModal/useModal';
import { useLocation } from 'react-router-dom';
import { i18nPrefix } from '@/utils';

interface IProps {
  children?: ReactNode;
}

const role: FC<IProps> = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const { form, data, loading, onClickSearch, onClickReset, onPageChange, getDataList } = useSearch<IGetRoleListRequest, IRoleItem>({
    defaultSearchInfo: {
      page: 1,
      size: 10
    },
    fetchData: getRoleListAPI
  });

  const {
    isModalVisible,
    modalType,
    actionLoading,
    form: modalForm,
    handleSave,
    closeModal,
    openModal
  } = useModal<ICreateRoleRequest, IEditRoleRequest, IRoleItem[]>({
    onSave: async (values, id) => {
      if (id) {
        // 编辑
        try {
          await editRoleAPI({
            id,
            ...values
          });
          closeModal();
        } catch (error: unknown) {
          const typedError = error as Error;
          messageApi.open({
            content: t(typedError.message),
            type: 'error'
          });
        }
      } else {
        // 创建
        try {
          await createRoleAPI(values);
          closeModal();
        } catch (error: unknown) {
          const typedError = error as Error;
          messageApi.open({
            content: t(typedError.message),
            type: 'error'
          });
        }
      }
      await getDataList();
    },
    key: 'id'
  });

  const childrenMap = {
    action: (values: IRoleItem) => (
      <Space>
        <Button size="small" type="primary" onClick={() => openModal(values)}>
          {t('global.table.action.edit')}
        </Button>
      </Space>
    ),
    status: ({ status }: IRoleItem) =>
      status === 1 ? <Tag color="green">{t('global.active')}</Tag> : <Tag color="red">{t('global.inactive')}</Tag>
  };
  return (
    <>
      <BaseForm {...roleSearchConfig} form={form} onSubmit={(values) => onClickSearch(values)} onReset={onClickReset}>
        <Button type="primary" color="cyan" variant="solid" onClick={() => openModal()}>
          {t('global.form.create')}
        </Button>
      </BaseForm>
      <BaseTable
        {...roleTableConfig}
        data={data}
        loading={loading}
        childrenMap={childrenMap}
        handleChangeSize={(page, size) => onPageChange(page, size)}
      ></BaseTable>
      <Modal
        open={isModalVisible}
        title={modalType === 'create' ? t(i18nPrefix(pathname, 'model.title.create')) : t(i18nPrefix(pathname, 'model.title.edit'))}
        confirmLoading={actionLoading}
        onOk={handleSave}
        onCancel={closeModal}
      >
        <BaseForm {...roleModalConfig} form={modalForm} layout="vertical" />
      </Modal>
      {contextHolder}
    </>
  );
};

export default memo(role);
