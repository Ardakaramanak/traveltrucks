
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCampers } from "../services/api";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 4, filters = {} } = {}, thunkAPI) => {
    try {
      const params = {
        page,
        limit,
        ...filters,
      };

      const data = await getCampers(params);

      return { data, page };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    total: 0,
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {
    clearCampers: (state) => {
      state.items = [];
      state.total = 0;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        if ((action.meta.arg?.page ?? 1) === 1) {
          state.items = [];
          state.total = 0;
          state.page = 1;
        }
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;

        const { data, page } = action.payload;
        const newItems = Array.isArray(data)
          ? data
          : data.items ?? [];

        if (page === 1) {
          state.items = newItems;
        } else {
          const existingIds = new Set(
            state.items.map((item) => item.id)
          );

          state.items.push(
            ...newItems.filter((item) => !existingIds.has(item.id))
          );
        }

        state.total = data.total ?? state.items.length;
        state.page = page;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        if (action.meta.aborted) return;
        state.error = action.payload || "Failed to load campers";
      });
  },
});

export const { clearCampers } = campersSlice.actions;
export default campersSlice.reducer;
