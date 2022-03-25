import { rest } from 'msw';
import React from 'react';

import { Provider } from 'react-redux';
import { store } from '../../lib/store';
import { storiesDefaultState } from '../TaskList';
import { InboxScreen } from './InboxScreen';

export default {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = (props) => <InboxScreen {...props} />;

export const Default = Template.bind();
Default.parameters = {
  msw: {
    handlers: [
      rest.get('https://jsonplaceholder.typicode.com/todos?userId=1', (_, response, ctx) => {
        return response(ctx.json(storiesDefaultState.tasks));
      }),
    ],
  },
};

export const Error = Template.bind();
Error.parameters = {
  msw: {
    handlers: [
      rest.get('https://jsonplaceholder.typicode.com/todos?userId=1', (_, response, ctx) => {
        return response(ctx.status(403));
      }),
    ],
  },
};
