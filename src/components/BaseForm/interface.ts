import { RuleObject } from 'antd/es/form';

interface IFormItemBase {
  type: 'input' | 'select' | 'action' | 'treeSelect' | 'custom';
  name?: string;
  label?: string;
  placeholder?: string;
  rules?: RuleObject[];
}

export interface IFormItemSelect extends IFormItemBase {
  type: 'select';
  allowClear?: boolean;
  options: { label: string; value: string | number }[];
}

interface IFormItemInput extends IFormItemBase {
  type: 'input';
}

interface IFormItemAction extends IFormItemBase {
  type: 'action';
  buttons: { type: 'primary' | 'default'; text: string; onClick?: () => void }[];
}

interface IFormItemTreeSelect extends IFormItemBase {
  type: 'treeSelect';
  // treeData: { label: string; value: string | number; children?: IFormItemTreeSelect['treeData'] }[];
  treeData: any;
  allowClear?: boolean;
  fieldNames?: {
    label?: string;
    value?: string;
    children?: string;
    key?: string;
  };
}

interface IFormItemCustom extends IFormItemBase {
  type: 'custom';
  render: (t: (key: string) => string) => React.ReactNode;
}

export type IFormItem = IFormItemInput | IFormItemSelect | IFormItemAction | IFormItemTreeSelect | IFormItemCustom;

// 表单组件
export interface IBaseForm {
  formItems: IFormItem[];
  row?: { gutter: number };
  col?: { span: number } | { sm: number; md: number; lg: number };
  showButtons?: boolean;
}
