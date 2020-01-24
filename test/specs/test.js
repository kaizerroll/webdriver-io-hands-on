const { expect } = require('chai')

describe('My Vue.js Example Application', () => {
    it('should be able to complete ToDos', () => {
        browser.url('/examples/vue/')

        enterTodo('To do #1')
        enterTodo('To do #2')
        enterTodo('To do #3')

        browser.pause(2000)

        const todos = browser.$$('.todo')
        toggleTodo(todos[1])

        browser.pause(2000)

        expect(printItemsLeft()).to.equal('2 items left')

    })
})

function enterTodo(text) {
    browser.$('.new-todo').setValue(text)
    browser.keys('Enter')
}

function toggleTodo(elem) {
    elem.$('.toggle').click()
}

function printItemsLeft() {
    const text = browser.$('.todo-count').getText()
    console.log(`todo count: ${text}`)
    return text
}