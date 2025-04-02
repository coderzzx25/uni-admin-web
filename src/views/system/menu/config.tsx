import { IBaseForm } from '@/components/BaseForm';
import { IGetMenuListResponse } from '@/service/modules/menu';
import { ColumnsType } from 'antd/es/table';

const menuSearchConfig: IBaseForm = {
  row: { gutter: 20 },
  col: { sm: 24, md: 12, lg: 6 },
  formItems: [
    {
      type: 'input',
      label: 'pages.system.menu.search.name.label',
      name: 'i18nName',
      placeholder: 'pages.system.menu.search.name.placeholder'
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

const menuTableConfig: { columns: ColumnsType<IGetMenuListResponse> } = {
  columns: [
    {
      title: 'global.table.field.title.id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'pages.system.menu.table.field.title.name',
      dataIndex: 'name',
      key: 'name',
      width: 120
    },
    {
      title: 'pages.system.menu.table.field.title.menuType',
      dataIndex: 'menuType',
      key: 'menuType',
      width: 120
    },
    {
      title: 'pages.system.menu.table.field.title.permission',
      dataIndex: 'permission',
      key: 'permission',
      width: 200
    },
    {
      title: 'pages.system.menu.table.field.title.path',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: 'pages.system.menu.table.field.title.menuIcon',
      dataIndex: 'menuIcon',
      key: 'menuIcon'
    },
    {
      title: 'pages.system.menu.table.field.title.i18nName',
      dataIndex: 'i18nName',
      key: 'i18nName'
    },
    {
      title: 'global.table.field.title.status',
      dataIndex: 'status',
      key: 'status'
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
      title: 'global.table.field.title.action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right'
    }
  ]
};

const menuModalConfig: IBaseForm = {
  col: { span: 24 },
  showButtons: false,
  formItems: [
    {
      type: 'treeSelect',
      label: 'pages.system.menu.model.form.field.parent.label',
      name: 'parentId',
      placeholder: 'pages.system.menu.model.form.field.parent.placeholder',
      fieldNames: {
        label: 'name',
        value: 'id'
      },
      allowClear: true,
      treeData: [],
      isI18n: true
    },
    {
      type: 'select',
      label: 'pages.system.menu.model.form.field.menuType.label',
      name: 'menuType',
      placeholder: 'pages.system.menu.model.form.field.menuType.placeholder',
      options: [
        { label: 'pages.system.menu.table.field.title.menuType.menus', value: 'menus' },
        { label: 'pages.system.menu.table.field.title.menuType.dir', value: 'dir' },
        { label: 'pages.system.menu.table.field.title.menuType.button', value: 'button' }
      ],
      rules: [
        {
          required: true,
          message: 'pages.system.menu.model.form.field.menuType.placeholder'
        }
      ]
    },
    {
      type: 'input',
      label: 'pages.system.menu.model.form.field.permission.label',
      name: 'permission',
      placeholder: 'pages.system.menu.model.form.field.permission.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.menu.model.form.field.path.label',
      name: 'path',
      placeholder: 'pages.system.menu.model.form.field.path.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.menu.model.form.field.menuIcon.label',
      name: 'menuIcon',
      placeholder: 'pages.system.menu.model.form.field.menuIcon.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.menu.model.form.field.i18nName.label',
      name: 'i18nName',
      placeholder: 'pages.system.menu.model.form.field.i18nName.placeholder'
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

export { menuSearchConfig, menuTableConfig, menuModalConfig };
