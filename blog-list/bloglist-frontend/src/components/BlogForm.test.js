import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('<BlogForm /> when submitted, addBlog should receive the author, title, and url values', () => {
  const mockAddBlog = jest.fn();
  const component = render(<BlogForm addBlog={mockAddBlog} />);
  const authorInput = component.container.querySelector('#author');
  const titleInput = component.container.querySelector('#title');
  const urlInput = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(authorInput, {
    target: { value: 'Tester' }
  });
  // const authorValue = authorInput.pendingProps.value;

  fireEvent.change(titleInput, {
    target: { value: 'Test Blog' }
  });

  fireEvent.change(urlInput, {
    target: { value: 'test.com' }
  });

  fireEvent.submit(form);
  expect(mockAddBlog.mock.calls).toHaveLength(1);
  expect(mockAddBlog.mock.calls[0][0].title).toBe('Test Blog');
  expect(mockAddBlog.mock.calls[0][0].author).toBe('Tester');
  expect(mockAddBlog.mock.calls[0][0].url).toBe('test.com');
});