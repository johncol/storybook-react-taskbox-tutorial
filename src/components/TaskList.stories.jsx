import React from 'react';

import { TaskList } from './TaskList';

import * as TaskStories from './Task.stories';
import { TaskState } from './Task';

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ padding: '3em' }}>{story()}</div>],
};

const Template = (props) => <TaskList {...props} />;

export const Default = Template.bind({});
Default.args = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
  ],
  onPinTask: () => {},
  onArchiveTask: () => {},
};

export const Pinned = Template.bind({});
Pinned.args = {
  ...Default.args,
  tasks: [
    ...Default.args.tasks,
    {
      ...TaskStories.Default.args.task,
      id: '4',
      title: 'Task 4',
      state: TaskState.Pinned,
    },
    {
      ...TaskStories.Default.args.task,
      id: '5',
      title: 'Task 5',
      state: TaskState.Pinned,
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
  tasks: [],
};

export const Empty = Template.bind({});
Empty.args = {
  ...Default.args,
  loading: false,
  tasks: [],
};
