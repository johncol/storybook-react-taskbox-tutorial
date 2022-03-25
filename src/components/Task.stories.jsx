import React from 'react';
import { Task } from './Task';
import { TaskState } from './TaskState';

const TaskStories = {
  component: Task,
  title: 'Task',
};
export default TaskStories;

const Template = (props) => {
  return <Task {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Just a test task in Storybook',
    state: TaskState.Inbox,
    updatedAt: new Date(2022, 2, 13, 19, 0, 0),
  },
  onPinTask: () => {},
  onArchiveTask: () => {},
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: TaskState.Pinned,
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: TaskState.Archived,
  },
};
