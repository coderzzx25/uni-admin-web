import { BaseForm } from '@/components/BaseForm';
import { memo, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { internationalModalConfig, internationalSearchConfig, internationalTableConfig } from './config';
import useSearch from '@/hooks/useSearch/useSearch';
import {
  createInternationalAPI,
  editInternationalAPI,
  getInternationalListAPI,
  ICreateInternationalRequest,
  IEditInternationalRequest,
  IInternationalItem
} from '@/service/modules/international';
import { BaseTable } from '@/components/BaseTable';
import { Button, message, Modal, Space, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { i18nPrefix } from '@/utils';
import useModal from '@/hooks/useModal/useModal';

interface IProps {
  children?: ReactNode;
}

const international: FC<IProps> = () => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const { form, data, getDataList } = useSearch({
    defaultSearchInfo: {},
    fetchData: getInternationalListAPI,
    isPage: false
  });
  const {
    isModalVisible,
    form: modelForm,
    openModal,
    actionLoading,
    handleSave,
    closeModal
  } = useModal<ICreateInternationalRequest, IEditInternationalRequest>({
    onSave: async (values, id) => {
      if (id) {
        // 编辑
        try {
          await editInternationalAPI({
            id,
            ...values
          });
          closeModal();
        } catch (error: unknown) {
          const typedError = error as Error;
          messageApi.open({
            content: typedError.message,
            type: 'error'
          });
        }
      } else {
        // 创建
        try {
          await createInternationalAPI(values);
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

  const modelConfig = useMemo(() => {
    return {
      ...internationalModalConfig,
      formItems: internationalModalConfig.formItems.map((item) => {
        if (item.name === 'parentId') {
          return {
            ...item,
            treeData: data
          };
        }
        return item;
      })
    };
  }, [data]);

  // 表格列自定义渲染
  const childrenMap = {
    action: (values: IInternationalItem) => {
      return (
        <Space>
          <Button type="primary" onClick={() => openModal(values)}>
            {t(i18nPrefix('global.table.edit'))}
          </Button>
        </Space>
      );
    },
    status: ({ status }: IInternationalItem) =>
      status === 1 ? (
        <Tag color="green">{t(i18nPrefix('global.active'))}</Tag>
      ) : (
        <Tag color="red">{t(i18nPrefix('global.inactive'))}</Tag>
      )
  };
  return (
    <>
      <BaseForm {...internationalSearchConfig} form={form}>
        <Button type="primary" color="cyan" variant="solid" onClick={() => openModal()}>
          {t('global.form.create')}
        </Button>
      </BaseForm>
      <BaseTable<IInternationalItem>
        {...internationalTableConfig}
        data={data}
        childrenMap={childrenMap}
        isPagination={false}
      ></BaseTable>
      <Modal
        title="国际化"
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

export default memo(international);
