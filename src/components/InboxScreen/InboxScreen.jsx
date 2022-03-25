import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../lib/taskbox';
import { TaskList } from './../TaskList';

export const InboxScreen = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.taskbox);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (error) {
    return <UndefinedErrorMessage />;
  }

  return (
    <div className="page lists-show">
      <ScreenNav title="TaskList" />
      <TaskList />
    </div>
  );
};

const UndefinedErrorMessage = () => (
  <div className="page lists-show">
    <div className="wrapper-message">
      <span className="icon-face-sad" />
      <div className="title-message">Oh no!</div>
      <div className="subtitle-message">Something went wrong</div>
    </div>
  </div>
);

const ScreenNav = ({ title }) => (
  <nav>
    <h1 className="title-page">
      <span className="title-wrapper">{title}</span>
    </h1>
  </nav>
);

InboxScreen.propTypes = {};
InboxScreen.defaultProps = {};
