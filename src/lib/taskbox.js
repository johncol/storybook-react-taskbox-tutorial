import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TaskState } from '../components/TaskState';

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

export const fetchTasks = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
  const data = await response.json();
  return data.map(({ id, title, completed }) => ({
    id: `${id}`,
    title,
    state: completed ? TaskState.Archived : TaskState.Inbox,
  }));
});

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

    extraReducers: (builder) => {
      builder
        .addCase(fetchTasks.pending, (state) => {
          state.status = 'loading';
          state.error = null;
          state.tasks = [];
        })
        .addCase(fetchTasks.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
          state.tasks = [];
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.error = null;
          state.tasks = action.payload;
        });
    },
  });

export const TaskSlice = TaskSliceCreator(initialState)();

export const { updateTaskState } = TaskSlice.actions;
