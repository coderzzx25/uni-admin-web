import { memo, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router';

interface IProps {
  children: ReactNode;
}

const isRouteHandle = (handle: unknown): handle is { title?: string } => {
  return typeof handle === 'object' && handle !== null && 'title' in handle;
};
const HigherDocumentTitle: FC<IProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const matches = useMatches();
  const match = matches[matches.length - 1];
  const routeTitle = match?.handle && isRouteHandle(match.handle) ? match.handle.title : undefined;

  const title = routeTitle ?? 'Uni Admin';
  useEffect(() => {
    document.title = t(title);
  }, [title, i18n.language]);
  return <>{children}</>;
};

export default memo(HigherDocumentTitle);
