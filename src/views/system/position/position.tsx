import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Button, Modal, Space, Tag } from 'antd';
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
  // 使用搜索hook
  const { form, data, loading, total, onClickSearch, onClickReset, getDataList } = useSearch<
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
    openModal,
    closeModal,
    handleSave
  } = useModal({
    onSave: async (values, id) => {
      if (id) {
        // 编辑
        await editPositionAPI({
          id,
          ...values
        });
      } else {
        // 创建
        const createValues = values as ICreatePositionRequest;
        await createPositionAPI(createValues);
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
          {t('EDIT_BUTTON')}
        </Button>
      </Space>
    ),
    status: ({ status }: IPositionItem) =>
      status === 1 ? (
        <Tag color="green">{t('DATE_STATUS.ACTIVE')}</Tag>
      ) : (
        <Tag color="red">{t('DATE_STATUS.INACTIVE')}</Tag>
      )
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
          {t('CREATE_BUTTON')}
        </Button>
      </BaseForm>
      <BaseTable<IPositionItem>
        {...positionTableConfig}
        data={data}
        loading={loading}
        childrenMap={childrenMap}
        total={total}
      />
      <Modal
        open={isModalVisible}
        title={
          modalType === 'create'
            ? t('SYSTEM.POSITION.MODAL_CONFIG.TITLE.ADD')
            : t('SYSTEM.POSITION.MODAL_CONFIG.TITLE.EDIT')
        }
        onOk={handleSave}
        onCancel={closeModal}
      >
        <BaseForm {...positionModalConfig} form={modalForm} />
      </Modal>
    </>
  );
};

export default memo(Position);
