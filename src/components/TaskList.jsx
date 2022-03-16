import * as React from 'react';
import PropTypes from 'prop-types';
import { Task, TaskState } from './Task';

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
    return <EmptyList />;
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

const LoadingTasks = () => {
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  return (
    <div className="list-items" data-testid="loading" key={'loading'}>
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
    </div>
  );
};

const EmptyList = () => {
  return (
    <div className="list-items" key={'empty'} data-testid="empty">
      <div className="wrapper-message">
        <span className="icon-check" />
        <div className="title-message">You have no tasks</div>
        <div className="subtitle-message">Sit back and relax</div>
      </div>
    </div>
  );
};
