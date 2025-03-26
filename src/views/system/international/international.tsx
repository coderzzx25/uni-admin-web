import { BaseForm } from '@/components/BaseForm';
import { memo, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { internationalModalConfig, internationalSearchConfig, internationalTableConfig } from './config';
import useSearch from '@/hooks/useSearch/useSearch';
import { getInternationalListAPI, IInternationalItem } from '@/service/modules/international';
import { BaseTable } from '@/components/BaseTable';
import { Button, Modal, Space, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { i18nPrefix } from '@/utils';
import useModal from '@/hooks/useModal/useModal';

interface IProps {
  children?: ReactNode;
}

const international: FC<IProps> = () => {
  const { t } = useTranslation();
  const { form, data } = useSearch({ defaultSearchInfo: {}, fetchData: getInternationalListAPI, isPage: false });
  const {
    isModalVisible,
    form: modelForm,
    openModal,
    actionLoading,
    handleSave,
    closeModal
  } = useModal({
    onSave: async (values) => {
      console.log(values);
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
    </>
  );
};

export default memo(international);
