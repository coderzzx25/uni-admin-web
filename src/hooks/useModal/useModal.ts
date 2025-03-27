import { Form, FormInstance } from 'antd';
import { useState } from 'react';

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<RecursivePartial<U>>
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};

type ModalType = 'create' | 'edit';

interface IModalProps<CreateType, EditType extends { id: number | string }> {
  onSave: (values: CreateType | Omit<EditType, 'id'>, id?: EditType['id']) => Promise<void>;
  key: keyof EditType & 'id';
  defaultData?: EditType;
}

interface IModalReturn<CreateType, EditType extends { id: number | string }> {
  isModalVisible: boolean;
  form: FormInstance<CreateType | Omit<EditType, 'id'>>;
  currentData: EditType | null;
  modalType: ModalType;
  actionLoading: boolean;
  openModal: (data?: EditType) => void;
  closeModal: () => void;
  handleSave: () => Promise<void>;
}

const useModal = <CreateType, EditType extends { id: number | string }>({
  onSave,
  key,
  defaultData
}: IModalProps<CreateType, EditType>): IModalReturn<CreateType, EditType> => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentData, setCurrentData] = useState<EditType | null>(defaultData || null);
  const [modalType, setModalType] = useState<ModalType>('create');
  const [form] = Form.useForm<CreateType | Omit<EditType, 'id'>>();

  const openModal = (data?: EditType) => {
    if (data) {
      setCurrentData(data);
      // 使用 _ 前缀表示忽略的变量
      const { [key]: _unused, ...restData } = data;
      // 或使用 void 操作符明确表示忽略
      void _unused;

      const formValues = restData as unknown as RecursivePartial<CreateType | Omit<EditType, 'id'>>;
      form.setFieldsValue(formValues);
      setModalType('edit');
    } else {
      setCurrentData(null);
      form.resetFields();
      setModalType('create');
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentData(null);
    form.resetFields();
  };

  const handleSave = async () => {
    setActionLoading(true);
    try {
      const values = await form.validateFields();
      if (modalType === 'edit' && currentData?.[key]) {
        await onSave(values as Omit<EditType, 'id'>, currentData[key]);
      } else {
        await onSave(values as CreateType);
      }
    } finally {
      setActionLoading(false);
    }
  };

  return {
    isModalVisible,
    currentData,
    form,
    modalType,
    actionLoading,
    openModal,
    closeModal,
    handleSave
  };
};

export default useModal;
