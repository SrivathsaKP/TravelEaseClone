import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabType } from '@/components/TabNavigation';

// Define a type for the slice state
interface TabState {
  activeTab: TabType;
}

// Define the initial state
const initialState: TabState = {
  activeTab: 'flights',
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TabType>) => {
      state.activeTab = action.payload;
    },
  },
});

// Export actions
export const { setActiveTab } = tabSlice.actions;

// Export reducer
export default tabSlice.reducer;