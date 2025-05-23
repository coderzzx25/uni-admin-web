import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { TranslationOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { setLanguageReducer } from '@/store/modules/user';
import { Language } from '@/global.types';

interface IProps {
  children?: ReactNode;
}

const Translation: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.user, useAppShallowEqual);
  const { i18n } = useTranslation();
  /**
   * 切换语言
   */
  const onClickLanguage = (local: Language) => {
    i18n.changeLanguage(local);
    dispatch(setLanguageReducer(local));
  };
  return <TranslationOutlined onClick={() => onClickLanguage(language === 'zhCN' ? 'enUS' : 'zhCN')} />;
};

export default memo(Translation);
