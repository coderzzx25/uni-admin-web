import { IBaseForm } from '@/components/BaseForm';

const departmentSearchConfig: IBaseForm = {
  row: { gutter: 20 },
  col: { sm: 24, md: 12, lg: 6 },
  formItems: [
    {
      type: 'input',
      label: 'pages.system.department.search.name.label',
      name: 'name',
      placeholder: 'pages.system.department.search.name.placeholder'
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

const departmentTableConfig = {
  columns: [
    {
      title: 'global.table.field.title.id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'pages.system.department.table.field.title.name',
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

const departmentModalConfig: IBaseForm = {
  col: { span: 24 },
  showButtons: false,
  formItems: [
    {
      type: 'treeSelect',
      label: 'pages.system.department.model.form.field.parent.label',
      name: 'parentId',
      placeholder: 'pages.system.department.model.form.field.parent.placeholder',
      fieldNames: {
        label: 'name',
        value: 'id'
      },
      allowClear: true,
      treeData: []
    },
    {
      type: 'input',
      label: 'pages.system.department.model.form.field.name.label',
      name: 'name',
      placeholder: 'pages.system.department.model.form.field.name.placeholder',
      rules: [
        {
          required: true,
          message: 'pages.system.department.model.form.field.name.placeholder'
        }
      ]
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

export { departmentSearchConfig, departmentTableConfig, departmentModalConfig };
