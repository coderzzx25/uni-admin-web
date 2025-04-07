import { IBaseForm } from '@/components/BaseForm';
import { IPermissionItem } from '@/service/modules/permission';
import { ColumnsType } from 'antd/es/table';

const permissionSearchConfig: IBaseForm = {
  row: { gutter: 20 },
  col: { sm: 24, md: 12, lg: 6 },
  formItems: [
    {
      type: 'select',
      label: 'pages.system.permission.search.name.label',
      name: 'roleId',
      placeholder: 'pages.system.permission.search.name.placeholder',
      allowClear: true,
      options: []
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

const permissionTableConfig: { columns: ColumnsType<IPermissionItem> } = {
  columns: [
    {
      title: 'global.table.field.title.id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'pages.system.permission.table.field.title.roleName',
      dataIndex: 'roleId',
      key: 'roleId'
    },
    {
      title: 'pages.system.permission.table.field.title.menuNameList',
      dataIndex: 'menuId',
      key: 'menuId',
      width: 200
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
      key: 'action',
      fixed: 'right'
    }
  ]
};

const permissionModalConfig: IBaseForm = {
  col: { span: 24 },
  showButtons: false,
  formItems: [
    {
      type: 'select',
      label: 'pages.system.permission.model.form.field.name.label',
      name: 'roleId',
      placeholder: 'pages.system.permission.model.form.field.name.placeholder',
      rules: [
        {
          required: true,
          message: 'pages.system.permission.model.form.field.name.placeholder'
        }
      ],
      options: []
    },
    {
      type: 'treeSelect',
      label: 'pages.system.permission.model.form.field.permission.label',
      name: 'menuId',
      placeholder: 'pages.system.permission.model.form.field.permission.placeholder',
      treeData: [],
      rules: [
        {
          required: true,
          message: 'pages.system.permission.model.form.field.permission.placeholder'
        }
      ],
      multiple: true,
      fieldNames: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      isI18n: true
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

export { permissionSearchConfig, permissionTableConfig, permissionModalConfig };
