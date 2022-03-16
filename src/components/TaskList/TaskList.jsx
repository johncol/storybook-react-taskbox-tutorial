import * as React from 'react';
import PropTypes from 'prop-types';
import { Task, TaskState } from './../Task';
import { LoadingTasks } from './LoadingTasks';
import { EmptyTasksList } from './EmptyTasksList';

export const TaskList = ({ tasks, loading, onPinTask, onArchiveTask }) => {
  const sortedTasks = React.useMemo(() => {
    return [
      ...tasks.filter((task) => task.state === TaskState.Pinned),
      ...tasks.filter((task) => task.state !== TaskState.Pinned),
    ];
  }, [tasks]);

  if (loading) {
    return <LoadingTasks />;
  }

  if (!tasks || tasks.length === 0) {
    return <EmptyTasksList />;
  }

  return (
    <div className="list-items">
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={onPinTask}
          onArchiveTask={onArchiveTask}
        />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  /** Whether the list of tasks has already being loaded*/
  loading: PropTypes.bool,
  /** List of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task),
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func.isRequired,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  loading: false,
  tasks: [],
};
