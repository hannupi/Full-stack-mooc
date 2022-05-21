const { dummy } = require('../utilities/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
})

