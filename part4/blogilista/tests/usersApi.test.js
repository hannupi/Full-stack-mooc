const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require("../models/user")


const startUsers = [
    {
        username: "Giga Tester",
        name: "tester1",
        password: "chocolate"
    },
    {
        username: "Jari",
        name: "tester2",
        password: "markku"
    }
]

beforeEach(async () => {
    await User.deleteMany()
    let userObject = new User(startUsers[0])
    await userObject.save()
    userObject = new User(startUsers[1])
    await userObject.save()

})

describe("Tests for user API", () => {
    test("Test database is set", async () => {
        const res = await api.get("/api/users")
        expect(res.body).toHaveLength(startUsers.length)
    })

    test("Try sending too short password through", async () => {
        const passwordTester = {
            username: "test132",
            name: "Testi Iso",
            password: "asd"
        }
        await api.post("/api/users")
            .send(passwordTester)
            .expect(400)

        const res = await api.get("/api/users")
        expect(res.body).toHaveLength(startUsers.length)
    })

    test("Username must be unique", async () => {
        const uniqueTester = {
            username: "Jari",
            name: "asdfasdfadsf",
            password: "asda"
        }

        await api.post("/api/users")
            .send(uniqueTester)
            .expect(400)
        const res = await api.get("/api/users")
        expect(res.body).toHaveLength(startUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})