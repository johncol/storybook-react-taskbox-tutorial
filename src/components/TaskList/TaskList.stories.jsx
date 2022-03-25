import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { TaskList } from './TaskList';

import * as TaskStories from './../Task/Task.stories';
import { TaskState } from './../TaskState';
import { TaskSliceCreator } from '../../lib/taskbox';

export const storiesDefaultState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
  ],
  status: 'idle',
  error: null,
};
const setStateToEvenTasks = (state) => (task, index) => index % 2 === 0 ? { ...task, state } : task;

const WithMockedStore = ({ taskboxState, children }) => {
  const slice = TaskSliceCreator(taskboxState)();
  const store = configureStore({
    reducer: {
      taskbox: slice.reducer,
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ padding: '3em' }}>{story()}</div>],
};

const Template = (props) => <TaskList {...props} />;

export const Default = Template.bind({});
Default.decorators = [(story) => <WithMockedStore taskboxState={storiesDefaultState}>{story()}</WithMockedStore>];

export const PinnedTasks = Template.bind({});
PinnedTasks.decorators = [
  (story) => (
    <WithMockedStore
      taskboxState={{
        ...storiesDefaultState,
        tasks: storiesDefaultState.tasks.map(setStateToEvenTasks(TaskState.Pinned)),
      }}
    >
      {story()}
    </WithMockedStore>
  ),
];

export const ArchivedTasks = Template.bind({});
ArchivedTasks.decorators = [
  (story) => (
    <WithMockedStore
      taskboxState={{
        ...storiesDefaultState,
        tasks: storiesDefaultState.tasks.map(setStateToEvenTasks(TaskState.Archived)),
      }}
    >
      {story()}
    </WithMockedStore>
  ),
];

export const Loading = Template.bind({});
Loading.decorators = [
  (story) => (
    <WithMockedStore
      taskboxState={{
        ...storiesDefaultState,
        status: 'loading',
      }}
    >
      {story()}
    </WithMockedStore>
  ),
];

export const Empty = Template.bind({});
Empty.decorators = [
  (story) => (
    <WithMockedStore
      taskboxState={{
        ...storiesDefaultState,
        tasks: [],
      }}
    >
      {story()}
    </WithMockedStore>
  ),
];
