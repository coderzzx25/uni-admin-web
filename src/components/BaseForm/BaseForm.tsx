import { memo } from 'react';
import type { ReactNode } from 'react';
import { IFormItem } from './interface';
import { Button, Col, Form, FormInstance, Input, Row, Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { i18nPrefix } from '@/utils';

interface IProps<T> {
  children?: ReactNode;
  formItems: IFormItem[];
  form: FormInstance<T>;
  row?: { gutter: number };
  col?: { span: number } | { sm: number; md: number; lg: number };
  showButtons?: boolean;
  layout?: 'horizontal' | 'vertical' | 'inline';
  onSubmit?: (values: T) => void;
  onReset?: () => void;
}

const renderFormItem = (item: IFormItem, t: (key: string) => string) => {
  if (!item) return null;

  const commonProps = {
    label: item.label ? t(item.label) : undefined,
    name: item.name,
    rules: item.rules ? item.rules.map((rule) => ({ ...rule, message: t(rule.message as string) })) : undefined
  };

  switch (item.type) {
    case 'input':
      return (
        <Form.Item {...commonProps}>
          <Input placeholder={item.placeholder ? t(item.placeholder) : undefined} />
        </Form.Item>
      );
    case 'select':
      return (
        <Form.Item {...commonProps}>
          <Select placeholder={item.placeholder ? t(item.placeholder) : undefined} allowClear={item.allowClear}>
            {item.options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {t(option.label)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
    default:
      return null;
  }
};

const BaseForm = <T extends object = any>({
  formItems,
  form,
  row,
  col,
  showButtons = true,
  layout = 'horizontal',
  onSubmit,
  onReset,
  children
}: IProps<T>) => {
  const { t } = useTranslation();

  return (
    <Form form={form} onFinish={onSubmit} layout={layout} autoComplete="off">
      <Row {...row}>
        {formItems.map((item, index) => (
          <Col key={index} {...col}>
            {renderFormItem(item, t)}
          </Col>
        ))}
        {showButtons && (
          <Col {...col}>
            <Space>
              <Button type="primary" htmlType="submit">
                {t(i18nPrefix('global.form.search'))}
              </Button>
              <Button onClick={onReset}>{t(i18nPrefix('global.form.reset'))}</Button>
              {children}
            </Space>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default memo(BaseForm) as typeof BaseForm;
