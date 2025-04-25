import { Language } from '@/global.types';
import { memo, useEffect, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  children: ReactNode;
  language: Language;
}

const HigherInitialLanguage: FC<IProps> = ({ children, language }) => {
  const { i18n } = useTranslation();

  const initialLanguage = useMemo(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    initialLanguage;
  }, [language]);
  return <>{children}</>;
};

export default memo(HigherInitialLanguage);
