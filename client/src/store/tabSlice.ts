import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabType = 
  | 'flights' 
  | 'hotels' 
  | 'homestays' 
  | 'holidayPackages' 
  | 'trains' 
  | 'buses' 
  | 'cabs' 
  | 'forexCards' 
  | 'travelInsurance';

interface TabState {
  currentTab: TabType;
}

const initialState: TabState = {
  currentTab: 'flights',
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<TabType>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = tabSlice.actions;
export default tabSlice.reducer;