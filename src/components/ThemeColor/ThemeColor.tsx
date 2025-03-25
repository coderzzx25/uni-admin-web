import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { setThemeColorReducer } from '@/store/modules/user';
import { ColorPicker } from 'antd';
import { Color } from 'antd/es/color-picker';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const ThemeColor: FC<IProps> = () => {
  const { themeColor } = useAppSelector((state) => state.user, useAppShallowEqual);
  const dispatch = useAppDispatch();
  const onChangeThemeColor = (color: Color) => {
    dispatch(setThemeColorReducer(color.toHexString()));
  };
  return (
    <ColorPicker value={themeColor} size="small" onChangeComplete={(color) => onChangeThemeColor(color)}></ColorPicker>
  );
};

export default memo(ThemeColor);
