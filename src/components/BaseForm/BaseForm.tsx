import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { Button, Col, Form, FormInstance, Input, Row, Select, Space } from 'antd';
import { IFormConfig, IFormItem } from './interface';

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
    default:
      return null;
  }
};

interface IProps {
  formConfig: IFormConfig;
  children?: ReactNode;
  className?: string;
  handleFormSearch?: (form: FormInstance) => void;
  handleFormReset?: (form: FormInstance) => void;
}
const BaseForm: FC<IProps> = ({ formConfig, className, handleFormSearch, handleFormReset }) => {
  const mergedConfig = { ...defaultFormConfig, ...formConfig };
  const [form] = Form.useForm();
  const handleSearch = () => {
    handleFormSearch && handleFormSearch(form);
  };
  const handleReset = () => {
    handleFormReset && handleFormReset(form);
  };
  return (
    <Row {...mergedConfig.row}>
      <Form form={form} layout="inline" className={className} style={{ width: '100%' }}>
        {mergedConfig.formItem.map((item, index) => (
          <Col key={index} {...mergedConfig.col}>
            {renderFormItem(item)}
          </Col>
        ))}
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default memo(BaseForm);
