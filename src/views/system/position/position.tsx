import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Button, message, Modal, Space, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import { BaseForm } from '@/components/BaseForm';
import { BaseTable } from '@/components/BaseTable';
import useSearch from '@/hooks/useSearch/useSearch';
import { positionSearchConfig, positionTableConfig, positionModalConfig } from './config';
import {
  createPositionAPI,
  editPositionAPI,
  getPositionListAPI,
  ICreatePositionRequest,
  IEditPositionRequest,
  IGetPositionListRequest,
  IPositionItem
} from '@/service/modules/position';
import useModal from '@/hooks/useModal/useModal';

interface IProps {
  children?: ReactNode;
}

const Position: FC<IProps> = () => {
  // 国际化
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  // 使用搜索hook
  const { form, data, loading, total, onClickSearch, onClickReset, onPageChange, getDataList } = useSearch<
    IGetPositionListRequest,
    IPositionItem
  >({
    defaultSearchInfo: {
      page: 1,
      size: 10
    },
    fetchData: getPositionListAPI
  });

  const {
    isModalVisible,
    form: modalForm,
    modalType,
    actionLoading,
    openModal,
    closeModal,
    handleSave
  } = useModal<ICreatePositionRequest, IEditPositionRequest>({
    onSave: async (values, id) => {
      if (id) {
        // 编辑
        try {
          await editPositionAPI({
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
          await createPositionAPI(values);
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

  // 表格列自定义渲染
  const childrenMap = {
    action: (values: IPositionItem) => (
      <Space>
        <Button type="primary" onClick={() => openModal(values)}>
          {t('global.table.edit')}
        </Button>
      </Space>
    ),
    status: ({ status }: IPositionItem) =>
      status === 1 ? <Tag color="green">{t('global.active')}</Tag> : <Tag color="red">{t('global.inactive')}</Tag>
  };

  return (
    <>
      <BaseForm
        {...positionSearchConfig}
        form={form}
        onSubmit={(values) => onClickSearch(values)}
        onReset={onClickReset}
      >
        <Button type="primary" color="cyan" variant="solid" onClick={() => openModal()}>
          {t('global.form.create')}
        </Button>
      </BaseForm>
      <BaseTable<IPositionItem>
        {...positionTableConfig}
        data={data}
        loading={loading}
        childrenMap={childrenMap}
        total={total}
        handleChangeSize={(size, pageSize) => onPageChange(size, pageSize)}
      />
      <Modal
        open={isModalVisible}
        title={modalType === 'create' ? t('pages.position.model.title.create') : t('pages.position.model.title.edit')}
        confirmLoading={actionLoading}
        onOk={handleSave}
        onCancel={closeModal}
      >
        <BaseForm {...positionModalConfig} form={modalForm} layout="vertical" />
      </Modal>
      {/* 错误提示 */}
      {contextHolder}
    </>
  );
};

export default memo(Position);
