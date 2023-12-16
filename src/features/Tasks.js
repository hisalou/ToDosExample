import { createSlice } from "@reduxjs/toolkit";
import { TasksData } from "../InitData";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: { value: TasksData },
  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.value = state.value.filter((task) => task.id !== action.payload.id);
    },

    updateTask: (state, action) => {
      state.value.map((task) => {
        if (task.id === action.payload.id) {
          task.done = action.payload.done;
        }
      });
    },
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
