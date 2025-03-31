import { Form, FormInstance, message } from 'antd';
import { useState } from 'react';

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U> ? Array<RecursivePartial<U>> : T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

type ModalType = 'create' | 'edit';

interface IModalProps<CreateType, EditType extends { id: number | string }, PrepareType> {
  onSave: (values: CreateType | Omit<EditType, 'id'>, id?: EditType['id']) => Promise<void>;
  onOpen?: (type: ModalType, data?: EditType) => Promise<PrepareType>;
  key: keyof EditType & 'id';
  defaultData?: EditType;
}

interface IModalReturn<CreateType, EditType extends { id: number | string }, PrepareType> {
  isModalVisible: boolean;
  form: FormInstance<CreateType | Omit<EditType, 'id'>>;
  currentData: EditType | null;
  modalType: ModalType;
  actionLoading: boolean;
  prepareData: PrepareType | null;
  openModal: (data?: EditType) => void;
  closeModal: () => void;
  handleSave: () => Promise<void>;
}

const useModal = <CreateType, EditType extends { id: number | string }, PrePareType = null>({
  onSave,
  onOpen,
  key,
  defaultData
}: IModalProps<CreateType, EditType, PrePareType>): IModalReturn<CreateType, EditType, PrePareType> => {
  const [state, setState] = useState({
    isModalVisible: false,
    actionLoading: false,
    currentData: defaultData || null,
    modalType: 'create' as ModalType,
    prepareData: null as PrePareType | null
  });
  const [form] = Form.useForm<CreateType | Omit<EditType, 'id'>>();

  const openModal = async (data?: EditType) => {
    try {
      let prepareData: PrePareType | null = null;

      if (onOpen) {
        prepareData = await onOpen(data ? 'edit' : 'create', data);
      }

      setState((prev) => ({
        ...prev,
        isModalVisible: true,
        currentData: data || null,
        modalType: data ? 'edit' : 'create',
        prepareData
      }));

      if (data) {
        const { [key]: _unused, ...restData } = data;
        void _unused;
        form.setFieldsValue(restData as unknown as RecursivePartial<CreateType | Omit<EditType, 'id'>>);
      }
    } catch (error: unknown) {
      const typeError = error as Error;
      message.error(typeError.message);
    }
  };

  const closeModal = () => {
    setState((prev) => ({
      ...prev,
      isModalVisible: false,
      prepareData: null
    }));
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      setState((prev) => ({ ...prev, actionLoading: true }));
      const values = await form.validateFields();

      if (state.modalType === 'edit' && state.currentData?.[key]) {
        await onSave(values as Omit<EditType, 'id'>, state.currentData[key]);
      } else {
        await onSave(values as CreateType);
      }
    } finally {
      setState((prev) => ({ ...prev, actionLoading: false }));
    }
  };

  return {
    ...state,
    form,
    openModal,
    closeModal,
    handleSave
  };
};

export default useModal;
