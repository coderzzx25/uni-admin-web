import { Form, FormInstance } from 'antd';
import { useState } from 'react';

// hook接收参数
interface IModalProps<T extends object> {
  onSave: (key: string | number, values: Partial<T>) => Promise<void>;
  key: keyof T;
  defaultData?: T;
}

// hook返回值
interface IModalReturn<T extends object> {
  isModalVisible: boolean;
  form: FormInstance<T>;
  currentData: T | null;
  openModal: (data?: T) => void;
  closeModal: () => void;
  handleSave: () => Promise<void>;
}

const useModal = <T extends object>({ onSave, key, defaultData }: IModalProps<T>): IModalReturn<T> => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState(defaultData || null);
  const [form] = Form.useForm();

  /**
   * 打开弹窗
   * @param data
   */
  const openModal = (data?: T) => {
    if (data) {
      setCurrentData(data);
      form.setFieldsValue(data);
    }
    setIsModalVisible(true);
  };

  /**
   * 关闭弹窗
   */
  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentData(null);
    form.resetFields();
  };

  /**
   * 提交表单
   */
  const handleSave = async () => {
    const values = await form.validateFields();
    if (currentData && currentData[key]) {
      await onSave(currentData[key] as string | number, values);
    }
    closeModal();
  };

  return {
    isModalVisible,
    currentData,
    form,
    openModal,
    closeModal,
    handleSave
  };
};

export default useModal;
