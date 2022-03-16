import * as React from 'react';

export const LoadingTasks = () => {
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
