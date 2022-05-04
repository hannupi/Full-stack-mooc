describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const account = {
            name: "Testaaja Timo",
            username: "dsa",
            password: "salis"
        }
        cy.request("POST", "http://localhost:3003/api/users/", account)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains("Login")
        cy.contains("Username")
        cy.contains("Password")
    })
    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get("#username").type("dsa")
            cy.get("#password").type("salis")
            cy.get("#loginButton").click()

            cy.contains("Successful login")
            cy.contains("Logged in as dsa")
        })

        it('fails with wrong credentials', function () {
            cy.get("#username").type("dsa")
            cy.get("#password").type("123")
            cy.get("#loginButton").click()

            cy.contains("Invalid username or password")
            cy.contains("Login")
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: "dsa", password: "salis" })
            cy.createBlog({
                title: "Paras title",
                author: "testi authori",
                url: "www.com",
                likes: 40
            })
            cy.createBlog({
                title: "second",
                author: "kissa",
                url: "www.cat.com",
                likes: 55
            })
            cy.createBlog({
                title: "first",
                author: "kissa",
                url: "www.cat.com",
                likes: 60
            })
            cy.contains("New blog").click()
        })

        it('A blog can be created', function () {
            cy.get("input[title=title]").type("Test title")
            cy.get("input[title=author]").type("Test author")
            cy.get("input[title=url]").type("www.com")
            cy.get("#submitButton").click()
        })

        it("Blog can be liked", function () {
            // The amount of likes is hard coded, results in fail if first blog object likes dont match
            cy.contains("View").click()
            cy.contains("Like").click()
            cy.contains("Likes: 61")
        })

        it("Blog can be deleted", function () {
            cy.contains("View").click()
            cy.contains("Delete").click()
            cy.reload()
            cy.get("html").not("Paras title")
            cy.get("html").not("testi authori")
        })

        it("Liked blogs are in correct order", function () {
            // Check that the blogs are in correct order, likes are hardcoded 
            cy.get(".blog").eq(0).should("contain", "first")
            cy.get(".blog").eq(1).should("contain", "second")
            cy.get(".blog").eq(2).should("contain", "Paras title")
        })
    })
})