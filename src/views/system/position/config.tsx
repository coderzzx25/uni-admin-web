import { IBaseForm } from '@/components/BaseForm';

const positionSearchConfig: IBaseForm = {
  row: { gutter: 20 },
  col: { sm: 24, md: 12, lg: 6 },
  formItems: [
    {
      type: 'input',
      label: 'pages.position.search.name.label',
      name: 'name',
      placeholder: 'pages.position.search.name.placeholder'
    },
    {
      type: 'select',
      label: 'global.status.label',
      name: 'status',
      placeholder: 'global.status.placeholder',
      allowClear: true,
      options: [
        { label: 'global.active', value: 1 },
        { label: 'global.inactive', value: 0 }
      ]
    }
  ]
};

const positionTableConfig = {
  columns: [
    {
      title: 'global.table.field.title.id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'pages.position.table.field.title.name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'global.table.field.title.createTime',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: 'global.table.field.title.updateTime',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: 'global.table.field.title.status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'global.table.field.title.action',
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
      label: 'pages.position.model.form.field.name.label',
      name: 'name',
      placeholder: 'pages.position.model.form.field.name.placeholder',
      rules: [
        {
          required: true,
          message: 'pages.position.model.form.field.name.placeholder'
        }
      ]
    },
    {
      type: 'select',
      label: 'global.status.label',
      name: 'status',
      placeholder: 'global.status.placeholder',
      allowClear: true,
      options: [
        { label: 'global.active', value: 1 },
        { label: 'global.inactive', value: 0 }
      ],
      rules: [
        {
          required: true,
          message: 'global.status.placeholder'
        }
      ]
    }
  ]
};

export { positionSearchConfig, positionTableConfig, positionModalConfig };
