import React from 'react';
import PropTypes from 'prop-types';
import { TaskState } from './TaskState';

export const Task = ({ task, onArchiveTask, onPinTask }) => {
  const { id, title, state } = task;
  const isArchived = state === TaskState.Archived;
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input type="checkbox" defaultChecked={isArchived} disabled={true} name="checked" />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(task)}
          id={`archiveTask-${id}`}
          aria-label={`archiveTask-${id}`}
        />
      </label>
      <div className="title">
        <input type="text" value={`${title}`} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={(e) => e.preventPropagation && e.preventPropagation()}>
        {!isArchived && (
          <a onClick={() => onPinTask(task)}>
            <span className="icon-star" id={`pinTask-${id}`} aria-label={`pinTask-${id}`} />
          </a>
        )}
      </div>
    </div>
  );
};

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
    /** Id of the task */
    id: PropTypes.string.isRequired,
    /** Title of the task */
    title: PropTypes.string.isRequired,
    /** Current state of the task */
    state: PropTypes.oneOf(Object.values(TaskState)).isRequired,
  }),
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
};
