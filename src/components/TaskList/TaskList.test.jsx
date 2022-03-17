import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as TaskListStories from './TaskList.stories';
import { TaskState } from './../Task';

const { PinnedTasks } = composeStories(TaskListStories);

describe('task list component', () => {
  it('renders pinned items first', () => {
    const { container } = render(<PinnedTasks />);

    const allListItems = container.querySelectorAll(`.list-item`);
    expect(allListItems[0].classList.contains(TaskState.Pinned)).toBe(true);
    expect(allListItems[1].classList.contains(TaskState.Pinned)).toBe(true);
    expect(allListItems[2].classList.contains(TaskState.Pinned)).toBe(false);
  });
});
