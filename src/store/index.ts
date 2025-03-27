import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook, useDispatch, shallowEqual } from 'react-redux';

import userReducer from './modules/user';
import localesReducer from './modules/locales';

const devTools = import.meta.env.DEV;

const store = configureStore({
  reducer: {
    user: userReducer,
    locales: localesReducer
  },
  devTools: devTools
});

// 封装数据类型
type GetStateFnType = typeof store.getState;
type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;
// 导出封装数据类型hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
// 导出封装方法hook
export const useAppDispatch: () => DispatchType = useDispatch;
// shallowEqual数据没有修改的情况下不更新
export const useAppShallowEqual = shallowEqual;

export default store;
