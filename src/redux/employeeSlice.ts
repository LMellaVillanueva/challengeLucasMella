import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axiosURL from "../axiosConfig/axiosURL";
import { EmployeeState } from "../types/types";

const token = window.localStorage.getItem('token');

const initialState: EmployeeState = {
    allEmployees: []
};

export const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployees: (state, action) => {
      state.allEmployees = [...action.payload];
    },
  },
});

export const getEmployeesAPI = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosURL.get("/api/employee", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (data) {
      dispatch(getEmployees(data));
    } else {
      dispatch(getEmployees([]));
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export default EmployeeSlice.reducer;
export const { getEmployees } = EmployeeSlice.actions;