import { Language } from '@/global.types';
import { getAllInternationalAPI, IGetAllInternationalResponse } from '@/service/modules/international';
import { localCache } from '@/utils/cache';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * 获取所有国际化语言
 */
export const fetchAllLocales = createAsyncThunk<IGetAllInternationalResponse, void>('locales/fetchAllLocales', async () => {
  const result = await getAllInternationalAPI();
  return result;
});

interface ILocalesState {
  allLocales: IGetAllInternationalResponse | null;
  language: Language;
}

const localesSlice = createSlice({
  name: 'locales',
  initialState: {
    allLocales: null,
    language: localCache.getCache('language') || 'zhCN'
  } as ILocalesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllLocales.fulfilled, (state, { payload }: PayloadAction<IGetAllInternationalResponse>) => {
      state.allLocales = payload;
    });
  }
});

export default localesSlice.reducer;
