import React from 'react';
import { Task, TaskState } from './MyTask';

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
    state: TaskState.Archvied,
  },
};
