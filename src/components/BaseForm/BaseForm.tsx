import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { Button, Col, Form, FormInstance, Input, Row, Select, Space } from 'antd';
import { IFormConfig, IFormItem } from './interface';

interface IProps {
  formConfig: IFormConfig;
  form: FormInstance;
  children?: ReactNode;
  className?: string;
}

const defaultFormConfig: Partial<IFormConfig> = {
  col: { sm: 24, md: 12, lg: 6 },
  row: { gutter: 16 }
};

const renderFormItem = (item: IFormItem) => {
  switch (item.type) {
    case 'input':
      return (
        <Form.Item label={item.label} name={item.name} initialValue={item.initialValue ?? undefined}>
          <Input placeholder={item.placeholder} />
        </Form.Item>
      );
    case 'select':
      return (
        <Form.Item label={item.label} name={item.name} initialValue={item.initialValue ?? undefined}>
          <Select placeholder={item.placeholder}>
            {item.options.map((option, index) => (
              <Select.Option key={index} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
    case 'action':
      return (
        <Form.Item noStyle>
          <Space>
            {item.buttons.map((button, index) => (
              <Button key={index} type={button.type} onClick={button.onClick ?? (() => {})}>
                {button.text}
              </Button>
            ))}
          </Space>
        </Form.Item>
      );
    default:
      return null;
  }
};

const BaseForm: FC<IProps> = ({ form, formConfig, className }) => {
  const mergedConfig = { ...defaultFormConfig, ...formConfig };
  return (
    <Row {...mergedConfig.row}>
      <Form form={form} layout="inline" className={className} style={{ width: '100%' }}>
        {mergedConfig.formItem.map((item, index) => (
          <Col key={index} {...mergedConfig.col}>
            {renderFormItem(item)}
          </Col>
        ))}
      </Form>
    </Row>
  );
};

export default memo(BaseForm);
