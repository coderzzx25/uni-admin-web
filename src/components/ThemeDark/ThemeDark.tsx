import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { setThemeDarkReducer } from '@/store/modules/user';

interface IProps {
  children?: ReactNode;
}

const ThemeDark: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const { themeDark } = useAppSelector((state) => state.user, useAppShallowEqual);
  const onClickThemeDark = () => {
    dispatch(setThemeDarkReducer(!themeDark));
  };
  return <>{themeDark ? <SunOutlined onClick={onClickThemeDark} /> : <MoonOutlined onClick={onClickThemeDark} />}</>;
};

export default memo(ThemeDark);
