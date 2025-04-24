import { IBaseForm } from '@/components/BaseForm';
import { IUserItem } from '@/service/modules/user';
import { ColumnsType } from 'antd/es/table';

const userSearchConfig: IBaseForm = {
  row: { gutter: 10 },
  col: { sm: 24, md: 12, lg: 8 },
  labelWidth: 130,
  formItems: [
    {
      type: 'input',
      label: 'pages.system.user.search.username.label',
      name: 'name',
      placeholder: 'pages.system.user.search.username.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.user.search.workNo.label',
      name: 'workNo',
      placeholder: 'pages.system.user.search.workNo.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.user.search.cnName.label',
      name: 'cnName',
      placeholder: 'pages.system.user.search.cnName.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.user.search.enName.label',
      name: 'enName',
      placeholder: 'pages.system.user.search.enName.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.user.search.email.label',
      name: 'email',
      placeholder: 'pages.system.user.search.email.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.user.search.phone.label',
      name: 'phone',
      placeholder: 'pages.system.user.search.phone.placeholder'
    },
    {
      type: 'select',
      label: 'pages.system.position.search.name.label',
      name: 'positionId',
      placeholder: 'pages.system.position.search.name.placeholder',
      allowClear: true,
      options: []
    },
    {
      type: 'select',
      label: 'pages.system.department.search.name.label',
      name: 'departmentId',
      placeholder: 'pages.system.department.search.name.placeholder',
      allowClear: true,
      options: []
    },
    {
      type: 'select',
      label: 'pages.system.role.search.name.label',
      name: 'roleId',
      placeholder: 'pages.system.role.search.name.placeholder',
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

const userTableConfig: { columns: ColumnsType<IUserItem> } = {
  columns: [
    {
      title: 'global.table.field.title.id',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: 'pages.system.user.table.field.title.username',
      dataIndex: 'username',
      key: 'username',
      width: 80
    },
    {
      title: 'pages.system.user.table.field.title.workNo',
      dataIndex: 'workNo',
      key: 'workNo',
      width: 100
    },
    {
      title: 'pages.system.user.table.field.title.cnName',
      dataIndex: 'cnName',
      key: 'cnName'
    },
    {
      title: 'pages.system.user.table.field.title.enName',
      dataIndex: 'enName',
      key: 'enName',
      width: 100
    },
    {
      title: 'pages.system.user.table.field.title.email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'pages.system.user.table.field.title.phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'pages.system.user.table.field.title.avatar',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      width: 80
    },
    {
      title: 'pages.system.position.table.field.title.name',
      dataIndex: 'positionId',
      key: 'positionId',
      width: 120
    },
    {
      title: 'pages.system.department.table.field.title.name',
      dataIndex: 'departmentId',
      key: 'departmentId',
      width: 120
    },
    {
      title: 'pages.system.role.table.field.title.name',
      dataIndex: 'roleId',
      key: 'roleId'
    },
    {
      title: 'pages.system.user.table.field.title.age',
      dataIndex: 'age',
      key: 'age',
      width: 60
    },
    {
      title: 'pages.system.user.table.field.title.sex',
      dataIndex: 'sex',
      key: 'sex'
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
      width: 100,
      fixed: 'right'
    }
  ]
};

const userModalConfig: IBaseForm = {
  col: { span: 24 },
  showButtons: false,
  formItems: [
    {
      type: 'input',
      label: 'pages.system.user.model.form.field.name.label',
      name: 'name',
      placeholder: 'pages.system.user.model.form.field.name.placeholder',
      rules: [
        {
          required: true,
          message: 'pages.system.user.model.form.field.name.placeholder'
        }
      ]
    },
    {
      type: 'input',
      label: 'pages.system.user.model.form.field.code.label',
      name: 'code',
      placeholder: 'pages.system.user.model.form.field.code.placeholder'
    },
    {
      type: 'input',
      label: 'pages.system.user.model.form.field.describe.label',
      name: 'describe',
      placeholder: 'pages.system.user.model.form.field.describe.placeholder'
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

export { userSearchConfig, userTableConfig, userModalConfig };
