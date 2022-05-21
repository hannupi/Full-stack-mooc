import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test("Submitting a new blog through blog form works", async () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)
    const title = screen.getByTitle("title")
    const author = screen.getByTitle("author")
    const url = screen.getByTitle("url")
    const submitButton = screen.getByText("Create")


    userEvent.type(title, "The best testing title")
    userEvent.type(author, "The best testing author")
    userEvent.type(url, "www.testing.com")
    await userEvent.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)


})