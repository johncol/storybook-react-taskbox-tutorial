import { createSlice } from '@reduxjs/toolkit';

const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

const initialState = {
  tasks: defaultTasks,
  status: 'idle',
  error: null,
};

export const TaskSliceCreator = (initialState) => () =>
  createSlice({
    name: 'taskbox',
    initialState,
    reducers: {
      updateTaskState: (state, action) => {
        const { id, newTaskState } = action.payload;
        state.tasks = state.tasks.map((task) => {
          if (task.id === id) {
            return { ...task, state: newTaskState };
          }
          return task;
        });
      },
    },
  });

export const TaskSlice = TaskSliceCreator(initialState)();

export const { updateTaskState } = TaskSlice.actions;
