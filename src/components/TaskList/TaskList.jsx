import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LoadingTasks } from './LoadingTasks';
import { EmptyTasksList } from './EmptyTasksList';
import { Task, TaskState } from './../Task';
import { updateTaskState } from '../../lib/taskbox';

export const TaskList = () => {
  const dispatch = useDispatch();

  const sortedNonArchivedTasks = useSelector(({ taskbox }) => {
    return [
      ...taskbox.tasks.filter((task) => task.state === TaskState.Pinned),
      ...taskbox.tasks.filter((task) => task.state === TaskState.Inbox),
      ...taskbox.tasks.filter((task) => task.state === TaskState.Archived),
    ];
  });
  const status = useSelector(({ taskbox }) => taskbox.status);

  const onToggleTaskState = useCallback(
    (task, toggleState) => {
      console.log('task', task);
      const newTaskState = task.state === toggleState ? TaskState.Inbox : toggleState;
      const action = updateTaskState({
        id: task.id,
        newTaskState,
      });
      dispatch(action);
    },
    [dispatch]
  );

  const onPinTask = useCallback((task) => onToggleTaskState(task, TaskState.Pinned), [onToggleTaskState]);
  const onArchiveTask = useCallback((task) => onToggleTaskState(task, TaskState.Archived), [onToggleTaskState]);

  const loading = status === 'loading';
  if (loading) {
    return <LoadingTasks />;
  }

  if (sortedNonArchivedTasks.length === 0) {
    return <EmptyTasksList />;
  }

  return (
    <div className="list-items">
      {sortedNonArchivedTasks.map((task) => (
        <Task key={task.id} task={task} onPinTask={onPinTask} onArchiveTask={onArchiveTask} />
      ))}
    </div>
  );
};
