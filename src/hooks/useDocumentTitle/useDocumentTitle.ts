import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';

interface RouteHandle {
  title?: string;
}

const isRouteHandle = (handle: unknown): handle is RouteHandle => {
  return typeof handle === 'object' && handle !== null && 'title' in handle;
};

const useDocumentTitle = () => {
  const { t, i18n } = useTranslation();
  const matches = useMatches();
  const match = matches[matches.length - 1];
  const routeTitle = match?.handle && isRouteHandle(match.handle) ? match.handle.title : undefined;

  const title = routeTitle ?? 'Uni Admin';
  useEffect(() => {
    document.title = t(title);
  }, [title, i18n.language]);
};

export default useDocumentTitle;
