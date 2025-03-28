import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { setThemeColorReducer } from '@/store/modules/user';
import { ColorPicker } from 'antd';
import { Color } from 'antd/es/color-picker';

interface IProps {
  children?: ReactNode;
  className?: string;
}

const ThemeColor: FC<IProps> = ({ className }) => {
  const { themeColor } = useAppSelector((state) => state.user, useAppShallowEqual);
  const dispatch = useAppDispatch();
  const onChangeThemeColor = (color: Color) => {
    dispatch(setThemeColorReducer(color.toHexString()));
  };
  return (
    <ColorPicker
      className={className}
      value={themeColor}
      size="small"
      onChangeComplete={(color) => onChangeThemeColor(color)}
    ></ColorPicker>
  );
};

export default memo(ThemeColor);
