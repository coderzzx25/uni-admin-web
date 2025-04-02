import { BaseForm } from '@/components/BaseForm';
import { memo, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { departmentModalConfig, departmentSearchConfig, departmentTableConfig } from './config';
import useSearch from '@/hooks/useSearch/useSearch';
import {
  createDepartmentAPI,
  editDepartmentAPI,
  getAllDepartmentSelectAPI,
  getDepartmentListAPI,
  ICreateDepartmentRequest,
  IEditDepartmentRequest,
  IGetDepartmentListResponse
} from '@/service/modules/department';
import { Button, message, Modal, Space, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { BaseTable } from '@/components/BaseTable';
import useModal from '@/hooks/useModal/useModal';
import { useLocation } from 'react-router-dom';
import { i18nPrefix } from '@/utils';

interface IProps {
  children?: ReactNode;
}

const department: FC<IProps> = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const { form, data, loading, onClickSearch, onClickReset, getDataList } = useSearch({
    defaultSearchInfo: {},
    fetchData: getDepartmentListAPI,
    isPage: false
  });

  const {
    form: modalForm,
    isModalVisible,
    modalType,
    actionLoading,
    prepareData,
    handleSave,
    openModal,
    closeModal
  } = useModal<ICreateDepartmentRequest, IEditDepartmentRequest, IGetDepartmentListResponse[]>({
    onSave: async (values, id) => {
      if (id) {
        // 编辑
        try {
          await editDepartmentAPI({
            id,
            ...values,
            parentId: values.parentId || 0
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
          await createDepartmentAPI(values);
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
      const treeData = await getAllDepartmentSelectAPI();
      return treeData;
    },
    key: 'id'
  });

  const childrenMap = {
    action: (values: IGetDepartmentListResponse) => (
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
    status: ({ status }: IGetDepartmentListResponse) =>
      status === 1 ? <Tag color="green">{t('global.active')}</Tag> : <Tag color="red">{t('global.inactive')}</Tag>
  };

  const modelConfig = useMemo(
    () => ({
      ...departmentModalConfig,
      formItems: departmentModalConfig.formItems.map((item) => {
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
  return (
    <>
      <BaseForm {...departmentSearchConfig} form={form} onSubmit={(values) => onClickSearch(values)} onReset={onClickReset}>
        <Button type="primary" color="cyan" variant="solid" onClick={() => openModal()}>
          {t('global.form.create')}
        </Button>
      </BaseForm>
      <BaseTable {...departmentTableConfig} data={data} loading={loading} childrenMap={childrenMap} isPagination={false}></BaseTable>
      <Modal
        open={isModalVisible}
        title={modalType === 'create' ? t(i18nPrefix(pathname, 'model.title.create')) : t(i18nPrefix(pathname, 'model.title.edit'))}
        confirmLoading={actionLoading}
        onOk={handleSave}
        onCancel={closeModal}
      >
        <BaseForm {...modelConfig} form={modalForm} layout="vertical" />
      </Modal>
      {contextHolder}
    </>
  );
};

export default memo(department);
