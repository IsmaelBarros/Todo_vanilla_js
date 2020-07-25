//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getLocalTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault()

    const valorInput = document.getElementsByClassName("todo-input")[0].value
    if (valorInput.length > 0) {
        //Todo DIV
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        //Create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todoInput.value
        console.log(todoInput.value)
        newTodo.classList.add('todo-item')
        //coloca <li> como filho de <div>
        todoDiv.appendChild(newTodo)
        //ADD TODO TO LOCALSTORAGE
        saveLocalTodos(todoInput.value)
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
        //CHECK TRASH BUTTON
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        //APPEND TO LIST
        todoList.appendChild(todoDiv)
        //Clear todo input after submitted
        todoInput.value = ""
    }
}

function deleteCheck(e) {
    const item = e.target
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement
        //Animation
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }
    //CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.children
    //convert html collection to array
    let arr = Array.prototype.slice.call(todos)
    arr.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    });
}

function saveLocalTodos(todo) {
    //CHECK---HEY Do I already have thing in there
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getLocalTodos() {
    //CHECK---HEY Do I already have thing in there
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function (todo) {
        //Todo DIV
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        //Create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        //coloca <li> como filho de <div>
        todoDiv.appendChild(newTodo)
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
        //CHECK TRASH BUTTON
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        //APPEND TO LIST
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo) {
    //CHECK---HEY Do I already have thing in there
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}
