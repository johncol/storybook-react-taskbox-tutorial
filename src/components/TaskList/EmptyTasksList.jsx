import * as React from 'react';

export const EmptyTasksList = () => {
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
