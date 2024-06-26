import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSimplifiedError } from "../../util";
import { APIService } from "../../util/APIService";
import { url } from "../../util/endpoints";
export interface AuthState {
  loading: boolean;
  fetchLoading: boolean;
  userData: any;
  token: string;
  verifiedStatus: boolean;
  registerSuccess: boolean;
  allCoaches: any;
  allStudents: any;
  saveCardData: any;
  allSavedCard: any,
  openCard: boolean;
}

const initialState: AuthState = {
  loading: false,
  userData: {},
  token: "",
  verifiedStatus: false,
  registerSuccess: false,
  fetchLoading: false,
  allCoaches: [],
  allStudents: [],
  saveCardData: {},
  allSavedCard: [],
  openCard: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;

    },
    restoreDefault: (state) => {
      state.registerSuccess = false;
      state.openCard = false;
      state.saveCardData = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
     
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(socialRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(socialRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload;
        state.token = payload.tokens;
      })
      .addCase(socialRegister.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload.data?.user;
        state.token = payload.data?.token;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
      })

      .addCase(verifyUserEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserEmail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.verifiedStatus = true;
      })
      .addCase(verifyUserEmail.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
      state.userData = payload.data
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
      state.userData = payload.data
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getAllCoaches.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllCoaches.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
      state.allCoaches = payload.data
      })
      .addCase(getAllCoaches.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getAllStudent.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllStudent.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
      state.allStudents = payload.data
      })
      .addCase(getAllStudent.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(saveMyCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveMyCard.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.saveCardData = payload.data;
        state.openCard = true
      })
      .addCase(saveMyCard.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getAllSavedCards.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllSavedCards.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.allSavedCard = payload.data;
    
      })
      .addCase(getAllSavedCards.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })

      
      ;
  },
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.register}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const socialRegister = createAsyncThunk(
  "socialRegister",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.socialRegister}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.login}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);


export const verifyUserEmail = createAsyncThunk(
  "verifyUserEmail",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(
        `${url.verifyUserEmail}?${payload}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "getUserProfiles",
  async (_, { rejectWithValue,getState }) => {
      const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.userProfile}`,
        {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (payload: any, { rejectWithValue,getState }) => {
          const { auth }: any = getState();
    try {
      const { data } = await APIService.put(
        `${url.userProfile}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const saveMyCard = createAsyncThunk(
  "saveMyCard",
  async (_: any, { rejectWithValue,getState }) => {
          const { auth }: any = getState();
    try {
      const { data } = await APIService.post(
        `${url.saveCard}`,
        "",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const getAllCoaches = createAsyncThunk(
  "getAllCoaches",
  async (_, { rejectWithValue,getState }) => {
          const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.allUser}/coach`,
        
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const getAllSavedCards = createAsyncThunk(
  "getAllSavedCard",
  async (_, { rejectWithValue,getState }) => {
          const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.savedCard}`,
        
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const getAllStudent = createAsyncThunk(
  "getAllStudent",
  async (_, { rejectWithValue,getState }) => {
          const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.allUser}/student`,
        
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);


export const authSelector = (state: any) => state.auth;

export const { clearState,restoreDefault } = authSlice.actions;
export default authSlice.reducer;
// function getState(): any {
//   throw new Error("Function not implemented.");
// }

