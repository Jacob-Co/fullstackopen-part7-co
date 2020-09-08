import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

// test('<Blog /> should display')

describe('<Blog />', () => {
  let component;
  let blog;
  const mockAddLike = jest.fn();

  beforeEach(() => {
    blog = {
      title: 'Test Blog',
      author: 'Tester',
      url: 'test.com',
      likes: 0,
      user: {
        name: 'T'
      }
    };

    component = render(<Blog blog={blog} addLike={mockAddLike} />);
  });

  test('should redner blog title and author but not likes and url by default', () => {
    const titleAuthorDiv = component.container.querySelector('.blogBasics');
    const likesUrlDiv = component.container.querySelector('.blogDetails');

    expect(titleAuthorDiv).not.toHaveStyle('display: none');
    expect(likesUrlDiv).toHaveStyle('display: none');
  });

  test('should render likes and url when view button is clicked', () => {
    const likesUrlDiv = component.container.querySelector('.blogDetails');
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);
    expect(likesUrlDiv).not.toHaveStyle('display: none');
  });

  test('when the like button is clicked twice, the prop add like should be called twice', () => {
    const viewButton = component.getByText('like');
    fireEvent.click(viewButton);
    fireEvent.click(viewButton);
    expect(mockAddLike.mock.calls).toHaveLength(2);
  });
});