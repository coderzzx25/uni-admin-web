import { IBaseForm } from '@/components/BaseForm';

const roleSearchConfig: IBaseForm = {
  row: { gutter: 20 },
  col: { sm: 24, md: 12, lg: 6 },
  formItems: [
    {
      type: 'input',
      label: 'pages.system.role.search.name.label',
      name: 'name',
      placeholder: 'pages.system.role.search.name.placeholder'
    },
    {
      type: 'select',
      label: 'global.form.field.status.label',
      name: 'status',
      placeholder: 'global.form.field.status.placeholder',
      allowClear: true,
      options: [
        { label: 'global.active', value: 1 },
        { label: 'global.inactive', value: 0 }
      ]
    }
  ]
};

const roleTableConfig = {
  columns: [
    {
      title: 'global.table.field.title.id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'pages.system.role.table.field.title.name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'pages.system.role.table.field.title.code',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'pages.system.role.table.field.title.describe',
      dataIndex: 'describe',
      key: 'describe'
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

const roleModalConfig: IBaseForm = {
  col: { span: 24 },
  showButtons: false,
  formItems: [
    {
      type: 'input',
      label: 'pages.system.role.model.form.field.name.label',
      name: 'name',
      placeholder: 'pages.system.role.model.form.field.name.placeholder',
      rules: [
        {
          required: true,
          message: 'pages.system.role.model.form.field.name.placeholder'
        }
      ]
    },
    {
      type: 'input',
      label: 'pages.system.role.model.form.field.code.label',
      name: 'code',
      placeholder: 'pages.system.role.model.form.field.code.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.role.model.form.field.describe.label',
      name: 'describe',
      placeholder: 'pages.system.role.model.form.field.describe.placeholder'
    },
    {
      type: 'select',
      label: 'global.form.field.status.label',
      name: 'status',
      placeholder: 'global.form.field.status.placeholder',
      allowClear: true,
      options: [
        { label: 'global.active', value: 1 },
        { label: 'global.inactive', value: 0 }
      ],
      rules: [
        {
          required: true,
          message: 'global.form.field.status.placeholder'
        }
      ]
    }
  ]
};

export { roleSearchConfig, roleTableConfig, roleModalConfig };
