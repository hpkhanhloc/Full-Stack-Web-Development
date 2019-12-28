import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('render content', () => {
  const blog = {
    title: 'Render Testing',
    author: 'Full Stack',
    url: 'htpp://fullstackopen.com',
    likes: 1000
  }

  const handleClick = () => console.log('Liked')

  const component = render(
    <SimpleBlog  blog={blog} onClick={handleClick} />
  )

  expect(component.container).toHaveTextContent(
    'Render Testing Full Stackblog has 1000 likes'
  )
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'Render Testing',
    author: 'Full Stack',
    url: 'htpp://fullstackopen.com',
    likes: 1000,
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})