interface IFormItemBase {
  type: 'input' | 'select' | 'action';
  initialValue?: string | number | string[] | number[] | undefined;
  name?: string;
  label?: string;
  placeholder?: string;
}

interface IFormItemSelect extends IFormItemBase {
  type: 'select';
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

export interface IFormConfig {
  formItem: IFormItem[];
  col?: { sm: number; md: number; lg: number } | { span: number };
  row?: { gutter: number };
}
