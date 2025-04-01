import { memo, useMemo } from 'react';
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
  getAllPositionSelectAPI,
  getPositionListAPI,
  ICreatePositionRequest,
  IEditPositionRequest,
  IGetPositionListRequest,
  IPositionItem
} from '@/service/modules/position';
import useModal from '@/hooks/useModal/useModal';
import { useLocation } from 'react-router-dom';
import { i18nPrefix } from '@/utils';

interface IProps {
  children?: ReactNode;
}

const Position: FC<IProps> = () => {
  // 国际化
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  // 使用搜索hook
  const { form, data, loading, onClickSearch, onClickReset, getDataList } = useSearch<IGetPositionListRequest, IPositionItem>({
    defaultSearchInfo: {},
    fetchData: getPositionListAPI,
    isPage: false
  });

  const {
    isModalVisible,
    form: modalForm,
    modalType,
    prepareData,
    actionLoading,
    openModal,
    closeModal,
    handleSave
  } = useModal<ICreatePositionRequest, IEditPositionRequest, IPositionItem[]>({
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
    onOpen: async () => {
      const treeData = await getAllPositionSelectAPI();
      return treeData;
    },
    key: 'id'
  });

  const modelConfig = useMemo(() => {
    return {
      ...positionModalConfig,
      formItems: positionModalConfig.formItems.map((item) => {
        if (item.name === 'parentId') {
          return {
            ...item,
            treeData: prepareData ?? []
          };
        }
        return item;
      })
    };
  }, [prepareData]);

  // 表格列自定义渲染
  const childrenMap = {
    action: (values: IPositionItem) => (
      <Space>
        <Button size="small" type="primary" onClick={() => openModal(values)}>
          {t('global.table.action.edit')}
        </Button>
        <Button
          size="small"
          color="pink"
          variant="solid"
          onClick={() => {
            openModal();
            modalForm.setFieldsValue({
              parentId: values.id
            });
          }}
        >
          {t('global.table.action.create-child')}
        </Button>
      </Space>
    ),
    status: ({ status }: IPositionItem) =>
      status === 1 ? <Tag color="green">{t('global.active')}</Tag> : <Tag color="red">{t('global.inactive')}</Tag>
  };

  return (
    <>
      <BaseForm {...positionSearchConfig} form={form} onSubmit={(values) => onClickSearch(values)} onReset={onClickReset}>
        <Button type="primary" color="cyan" variant="solid" onClick={() => openModal()}>
          {t('global.form.create')}
        </Button>
      </BaseForm>
      <BaseTable<IPositionItem> {...positionTableConfig} data={data} loading={loading} childrenMap={childrenMap} isPagination={false} />
      <Modal
        open={isModalVisible}
        title={modalType === 'create' ? t(i18nPrefix(pathname, 'model.title.create')) : t(i18nPrefix(pathname, 'model.title.edit'))}
        confirmLoading={actionLoading}
        onOk={handleSave}
        onCancel={closeModal}
      >
        <BaseForm {...modelConfig} form={modalForm} layout="vertical" />
      </Modal>
      {/* 错误提示 */}
      {contextHolder}
    </>
  );
};

export default memo(Position);
