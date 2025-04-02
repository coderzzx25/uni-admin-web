import { BaseForm } from '@/components/BaseForm';
import useSearch from '@/hooks/useSearch/useSearch';
import { memo, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { menuModalConfig, menuSearchConfig, menuTableConfig } from './config';
import {
  createMenuAPI,
  editMenuAPI,
  getAllMenuSelectAPI,
  getMenuListAPI,
  ICreateMenuRequest,
  IEditMenuRequest,
  IGetMenuListRequest,
  IGetMenuListResponse
} from '@/service/modules/menu';
import { BaseTable } from '@/components/BaseTable';
import { Button, message, Modal, Space, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import useModal from '@/hooks/useModal/useModal';
import { i18nPrefix } from '@/utils';
import { useLocation } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

const { Text } = Typography;

const menu: FC<IProps> = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const { form, data, loading, onClickSearch, onClickReset, getDataList } = useSearch<IGetMenuListRequest, IGetMenuListResponse>({
    defaultSearchInfo: {},
    fetchData: getMenuListAPI,
    isPage: false
  });

  const {
    isModalVisible,
    modalType,
    actionLoading,
    handleSave,
    closeModal,
    form: modelForm,
    prepareData,
    openModal
  } = useModal<ICreateMenuRequest, IEditMenuRequest, IGetMenuListResponse[]>({
    onSave: async (values, id) => {
      if (id) {
        // 编辑
        try {
          await editMenuAPI({
            id,
            ...values,
            parentId: values.parentId || 0
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
          await createMenuAPI(values);
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
    onOpen: async () => {
      const treeData = await getAllMenuSelectAPI();
      return treeData;
    },
    key: 'id'
  });

  const modelConfig = useMemo(
    () => ({
      ...menuModalConfig,
      formItems: menuModalConfig.formItems.map((item) => {
        if (item.name === 'parentId') {
          return {
            ...item,
            treeData: prepareData ?? []
          };
        }
        return item;
      })
    }),
    [prepareData]
  );

  const childrenMap = {
    action: (values: IGetMenuListResponse) => (
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
            modelForm.setFieldsValue({
              parentId: values.id
            });
          }}
        >
          {t('global.table.action.create-child')}
        </Button>
      </Space>
    ),
    status: ({ status }: IGetMenuListResponse) =>
      status === 1 ? <Tag color="green">{t('global.active')}</Tag> : <Tag color="red">{t('global.inactive')}</Tag>,
    menuType: ({ menuType }: IGetMenuListResponse) => {
      switch (menuType) {
        case 'menus':
          return <Tag color="green">{t(i18nPrefix(pathname, 'table.field.title.menuType.menus'))}</Tag>;
        case 'dir':
          return <Tag color="pink">{t(i18nPrefix(pathname, 'table.field.title.menuType.dir'))}</Tag>;
        case 'button':
          return <Tag color="blue">{t(i18nPrefix(pathname, 'table.field.title.menuType.button'))}</Tag>;
        default:
          return null;
      }
    },
    name: ({ name }: IGetMenuListResponse) => <Text>{t(name)}</Text>
  };
  return (
    <>
      <BaseForm {...menuSearchConfig} form={form} onSubmit={(values) => onClickSearch(values)} onReset={onClickReset}>
        <Button type="primary" color="cyan" variant="solid" onClick={() => openModal()}>
          {t('global.form.create')}
        </Button>
      </BaseForm>
      <BaseTable {...menuTableConfig} data={data} childrenMap={childrenMap} loading={loading} isPagination={false}></BaseTable>
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

export default memo(menu);
