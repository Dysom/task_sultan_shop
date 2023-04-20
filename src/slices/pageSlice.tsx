import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { MOBILE_DESKTOP_BREAKPOINT } from '../constants';


export interface PageState {  
  mobileMode: boolean
}

const initialState: PageState = {
  mobileMode: window.innerWidth <= MOBILE_DESKTOP_BREAKPOINT
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setMobileMode: (state ) => {
      state.mobileMode = window.innerWidth <= MOBILE_DESKTOP_BREAKPOINT;
    }
  }
});

export const { setMobileMode } = pageSlice.actions;

export default pageSlice.reducer;
