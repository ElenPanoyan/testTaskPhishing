import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "utils/axios";
import { TPhishingProps } from "container/Home";

export const phishingAttempts = createAsyncThunk(
  "phishing/attempts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = (await axiosInstance.get("/phishing/attempts")) as any;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const phishingPost = createAsyncThunk(
  "phishing/post",
  async (body: TPhishingProps, { rejectWithValue, dispatch }) => {
    try {
      const { data } = (await axiosInstance.post(
        "/phishing/send",
        body
      )) as any;

      dispatch(phishingAttempts());

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
