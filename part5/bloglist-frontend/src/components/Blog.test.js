import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    user: "tester",
    likes: 1,
    title: "test title",
    author: "Test author",
    url: "www.test.com",
}

test("Returns something", () => {
    render(<Blog blog={blog} />)
    const element = screen.getByText("test title Test author")
    expect(element).toBeDefined()

})

test("Shows title and author but not URL or likes", () => {
    render(<Blog blog={blog} />)
    expect(screen.getByText("test title Test author"))
    expect(screen.getByText("www.test.com")).not.toBeVisible()
    expect(screen.getByText("Likes:", { exact: false })).not.toBeVisible()
    screen.debug()
})

test("URL and likes shown after button press", async () => {
    render(<Blog blog={blog} />)

    const button = screen.getByText("View")
    await userEvent.click(button)
    expect(screen.getByText("www.test.com")).toBeVisible()
    expect(screen.getByText("Likes:", { exact: false })).toBeVisible()

})