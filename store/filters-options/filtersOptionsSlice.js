import { createSlice } from '@reduxjs/toolkit';
import locales from 'constants/locales';

const initialState = () => ({
  animalCategories: [],
  coatColors: [],
  distinctiveFeatures: [],
  areOptionsLoading: true,
});

export const filtersOptionsSlice = createSlice({
  name: 'filtersOptions',
  initialState: initialState(),
  reducers: {
    setAnimalCategories: (state, action) => {
      state.animalCategories = [
        {
          id: 0,
          namePl: locales.ALL_FEMALE,
        }, ...action.payload,
      ];
    },
    setCoatColors: (state, action) => {
      state.coatColors = [...action.payload];
    },
    setDistinctiveFeatures: (state, action) => {
      state.distinctiveFeatures = [...action.payload];
    },
    setAreOptionsLoading: (state, action) => {
      state.areOptionsLoading = action.payload;
    },
  },
});

export const {
  setAnimalCategories, setCoatColors, setDistinctiveFeatures, setAreOptionsLoading,
} = filtersOptionsSlice.actions;
export default filtersOptionsSlice.reducer;
