import { IBaseForm } from '@/components/BaseForm';

const positionSearchConfig: IBaseForm = {
  row: { gutter: 20 },
  col: { sm: 24, md: 12, lg: 6 },
  formItems: [
    {
      type: 'input',
      label: 'SYSTEM.POSITION.SEARCH_CONFIG.NAME.LABEL',
      name: 'name',
      placeholder: 'SYSTEM.POSITION.SEARCH_CONFIG.NAME.PLACEHOLDER'
    },
    {
      type: 'select',
      label: 'SYSTEM.POSITION.SEARCH_CONFIG.STATUS.LABEL',
      name: 'status',
      placeholder: 'SYSTEM.POSITION.SEARCH_CONFIG.STATUS.PLACEHOLDER',
      allowClear: true,
      options: [
        { label: 'DATE_STATUS.ACTIVE', value: 1 },
        { label: 'DATE_STATUS.INACTIVE', value: 0 }
      ]
    }
  ]
};

const positionTableConfig = {
  columns: [
    {
      title: 'SYSTEM.POSITION.TABLE_CONFIG.ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'SYSTEM.POSITION.TABLE_CONFIG.NAME',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'SYSTEM.POSITION.TABLE_CONFIG.CREATE_TIME',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: 'SYSTEM.POSITION.TABLE_CONFIG.UPDATE_TIME',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: 'SYSTEM.POSITION.TABLE_CONFIG.STATUS',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'SYSTEM.POSITION.TABLE_CONFIG.ACTION',
      dataIndex: 'action',
      key: 'action'
    }
  ]
};

const positionModalConfig: IBaseForm = {
  col: { span: 24 },
  showButtons: false,
  formItems: [
    {
      type: 'input',
      label: 'SYSTEM.POSITION.MODAL_CONFIG.FORM_CONFIG.NAME.LABEL',
      name: 'name',
      placeholder: 'SYSTEM.POSITION.MODAL_CONFIG.FORM_CONFIG.NAME.PLACEHOLDER',
      rules: [
        {
          required: true,
          message: 'SYSTEM.POSITION.MODAL_CONFIG.FORM_CONFIG.NAME.VALIDATE.REQUIRED'
        }
      ]
    },
    {
      type: 'select',
      label: 'SYSTEM.POSITION.MODAL_CONFIG.FORM_CONFIG.STATUS.LABEL',
      name: 'status',
      placeholder: 'SYSTEM.POSITION.MODAL_CONFIG.FORM_CONFIG.STATUS.PLACEHOLDER',
      allowClear: true,
      options: [
        { label: 'DATE_STATUS.ACTIVE', value: 1 },
        { label: 'DATE_STATUS.INACTIVE', value: 0 }
      ],
      rules: [
        {
          required: true,
          message: 'SYSTEM.POSITION.MODAL_CONFIG.FORM_CONFIG.STATUS.VALIDATE.REQUIRED'
        }
      ]
    }
  ]
};

export { positionSearchConfig, positionTableConfig, positionModalConfig };
