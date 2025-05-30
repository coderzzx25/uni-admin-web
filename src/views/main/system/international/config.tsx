import { IBaseForm } from '@/components/BaseForm';
import { IInternationalItem } from '@/service/modules/international';
import { ColumnsType } from 'antd/es/table';

const internationalSearchConfig: IBaseForm = {
  row: { gutter: 20 },
  col: { sm: 24, md: 12, lg: 6 },
  formItems: [
    {
      type: 'input',
      label: 'pages.system.international.search.name.label',
      name: 'name',
      placeholder: 'pages.system.international.search.name.placeholder'
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

const internationalTableConfig: { columns: ColumnsType<IInternationalItem> } = {
  columns: [
    {
      title: 'global.table.field.title.id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'pages.system.international.table.field.title.name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'pages.system.international.table.field.title.zhCN',
      dataIndex: 'zhCN',
      key: 'zhCN',
      width: 100
    },
    {
      title: 'pages.system.international.table.field.title.enUS',
      dataIndex: 'enUS',
      key: 'enUS',
      width: 100
    },
    {
      title: 'global.table.field.title.createTime',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: 'global.table.field.title.updateTime',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 180
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
      fixed: 'right',
      width: 190
    }
  ]
};

const internationalModalConfig: IBaseForm = {
  col: { span: 24 },
  showButtons: false,
  formItems: [
    {
      type: 'treeSelect',
      label: 'pages.system.international.model.form.field.parent.label',
      name: 'parentId',
      placeholder: 'pages.system.international.model.form.field.parent.placeholder',
      treeData: [],
      fieldNames: {
        label: 'name',
        value: 'id'
      },
      allowClear: true
    },
    {
      type: 'input',
      label: 'pages.system.international.model.form.field.name.label',
      name: 'name',
      placeholder: 'pages.system.international.model.form.field.name.placeholder',
      rules: [
        {
          required: true,
          message: 'pages.system.international.model.form.field.name.placeholder'
        }
      ]
    },
    {
      type: 'input',
      label: 'pages.system.international.model.form.field.zhCN.label',
      name: 'zhCN',
      placeholder: 'pages.system.international.model.form.field.zhCN.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.international.model.form.field.enUS.label',
      name: 'enUS',
      placeholder: 'pages.system.international.model.form.field.enUS.placeholder'
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

export { internationalSearchConfig, internationalTableConfig, internationalModalConfig };
