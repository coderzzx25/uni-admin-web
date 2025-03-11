import { RuleObject } from 'antd/es/form';

interface IFormItemBase {
  type: 'input' | 'select' | 'action' | 'custom';
  name?: string;
  label?: string;
  placeholder?: string;
  rules?: RuleObject[];
}

interface IFormItemSelect extends IFormItemBase {
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

export type IFormItem = IFormItemInput | IFormItemSelect | IFormItemAction;

// 表单组件
export interface IBaseForm {
  formItems: IFormItem[];
  row?: { gutter: number };
  col?: { span: number } | { sm: number; md: number; lg: number };
  showButtons?: boolean;
}
