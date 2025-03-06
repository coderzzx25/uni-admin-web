import { localCache } from '@/utils/cache';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserAccountLoginResponse, refreshTokenAPI } from '@/service/modules/auth';
import { IUserInfoResponse, userInfoAPI, userMenuListAPI, IUserMenuListResponse } from '@/service/modules/auth';

interface IUserState {
  token: string;
  refreshToken: string;
  userInfo: IUserInfoResponse | null;
  userMenus: IUserMenuListResponse[] | [];
  themeDark: boolean;
  themeColor: string;
  collapsed: boolean;
  language: string;
}

/**
 * 获取用户信息
 */
export const fetchUserInfo = createAsyncThunk<IUserInfoResponse, void>('user/fetchUserInfo', async () => {
  const result = await userInfoAPI();
  return result;
});
/**
 * 获取菜单信息
 */
export const fetchUserMenus = createAsyncThunk<IUserMenuListResponse[], void>('user/fetchUserMenus', async () => {
  const result = await userMenuListAPI();
  return result;
});

export const fetchRefreshToken = createAsyncThunk<IUserAccountLoginResponse, string>(
  'user/fetchRefreshToken',
  async (refreshToken: string) => {
    const result = await refreshTokenAPI(refreshToken);
    return result;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localCache.getCache('token') || '',
    refreshToken: localCache.getCache('refreshToken') || '',
    userInfo: null,
    userMenus: [],
    themeDark: localCache.getCache('themeDark') || false,
    themeColor: localCache.getCache('themeColor') || '#1677ff',
    collapsed: localCache.getCache('collapsed') || false,
    language: localCache.getCache('language') || 'cn'
  } as IUserState,
  reducers: {
    setTokenReducer(state, { payload }: PayloadAction<IUserAccountLoginResponse>) {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;

      // 将token存储到localStorage中
      localCache.setCache('token', payload.token);
      localCache.setCache('refreshToken', payload.refreshToken);
    },
    clearTokenReducer(state) {
      state.token = '';
      state.refreshToken = '';

      // 将token存储到localStorage中
      localCache.deleteCache('token');
      localCache.deleteCache('refreshToken');
    },
    setThemeDarkReducer(state, { payload }: PayloadAction<boolean>) {
      state.themeDark = payload;

      localCache.setCache('themeDark', payload);
    },
    setThemeColorReducer(state, { payload }: PayloadAction<string>) {
      state.themeColor = payload;

      localCache.setCache('themeColor', payload);
    },
    setCollapsedReducer(state, { payload }: PayloadAction<boolean>) {
      state.collapsed = payload;

      localCache.setCache('collapsed', payload);
    },
    setLanguageReducer(state, { payload }: PayloadAction<string>) {
      state.language = payload;

      localCache.setCache('language', payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }: PayloadAction<IUserInfoResponse>) => {
      state.userInfo = payload;
    });
    builder.addCase(fetchUserMenus.fulfilled, (state, { payload }: PayloadAction<IUserMenuListResponse[]>) => {
      state.userMenus = payload;
    });
    builder.addCase(fetchRefreshToken.fulfilled, (state, { payload }: PayloadAction<IUserAccountLoginResponse>) => {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;

      // 将token存储到localStorage中
      localCache.setCache('token', payload.token);
      localCache.setCache('refreshToken', payload.refreshToken);
    });
  }
});

export const { setTokenReducer, clearTokenReducer, setThemeDarkReducer, setCollapsedReducer, setLanguageReducer } =
  userSlice.actions;

export default userSlice.reducer;
