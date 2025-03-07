import { memo, useCallback } from 'react';
import type { FC, ReactNode } from 'react';

import { Button, Col, Form, FormInstance, Input, Row, Select, Space } from 'antd';
import { IFormConfig, IFormItem } from './interface';
import { useTranslation } from 'react-i18next';

const defaultFormConfig: Partial<IFormConfig> = {
  col: { sm: 24, md: 12, lg: 6 },
  row: { gutter: 16 }
};

const renderFormItem = (item: IFormItem, t: (key: string) => string) => {
  switch (item.type) {
    case 'input':
      return (
        <Form.Item label={item.label && t(item.label)} name={item.name} initialValue={item.initialValue ?? undefined}>
          <Input placeholder={(item.placeholder && t(item.placeholder)) ?? `请输入${item.label}`} />
        </Form.Item>
      );
    case 'select':
      return (
        <Form.Item label={item.label && t(item.label)} name={item.name} initialValue={item.initialValue ?? undefined}>
          <Select
            placeholder={(item.placeholder && t(item.placeholder)) ?? `请选择${item.label}`}
            allowClear={item.allowClear}
          >
            {item.options.map((option, index) => (
              <Select.Option key={index} value={option.value}>
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

interface IProps {
  formConfig: IFormConfig;
  children?: ReactNode;
  className?: string;
  handleFormSearch?: (form: FormInstance) => void;
  handleFormReset?: (form: FormInstance) => void;
}
const BaseForm: FC<IProps> = ({ formConfig, className, handleFormSearch, handleFormReset }) => {
  const { t } = useTranslation();
  const mergedConfig = { ...defaultFormConfig, ...formConfig };
  const [form] = Form.useForm();
  const handleSearch = useCallback(() => {
    handleFormSearch && handleFormSearch(form);
  }, [form]);
  const handleReset = useCallback(() => {
    handleFormReset && handleFormReset(form);
  }, [form]);
  return (
    <Row {...mergedConfig.row}>
      <Form form={form} layout="inline" autoComplete="off" className={className} style={{ width: '100%' }}>
        {mergedConfig.formItem.map((item, index) => (
          <Col key={index} {...mergedConfig.col}>
            {renderFormItem(item, t)}
          </Col>
        ))}
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>
              {t('SEARCH_BUTTON')}
            </Button>
            <Button onClick={handleReset}>{t('RESET_BUTTON')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default memo(BaseForm);
