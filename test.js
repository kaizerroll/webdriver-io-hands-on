const { remote } = require('webdriverio')

let browser;

(async () => {
    browser = await remote({
        capabilities: {
            browserName: 'chrome'
        }
    })

    // add your automation code here
    // access the url
    await browser.url('http://todomvc.com/examples/vue/')

    await enterTodo('my todo #1')
    await enterTodo('my todo #2')
    await enterTodo('my todo #3')

    const todos = await browser.$$('.todo')

    await toggleTodo(todos[1]);

    await printItemsLeft();

    await browser.pause(2000)

    await browser.deleteSession()
})().catch(async (e) => {
    console.error(e)

    // close browser if something in our code went wrong
    await browser.deleteSession()
});

async function enterTodo(text) {
    const newTodoInput = await browser.$('.new-todo')

    await newTodoInput.setValue(text)
    // returning last promise so I can await it's response
    return browser.keys('Enter')
}

async function toggleTodo(elem) {
    const toggle = await elem.$('.toggle')
    return toggle.click()
}

async function printItemsLeft() {
    const itemsLeft = await browser.$('.todo-count')
    const text = await itemsLeft.getText()
    console.log(`todo count: ${text}`)

    return Promise.resolve()
}