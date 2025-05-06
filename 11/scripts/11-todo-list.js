let todoList = [];

displayTodoList();

function addTodo() {
  const todoElement = document.querySelector('.js-todo-input');
  const dateElement = document.querySelector('.js-date-input');
  const name = todoElement.value;
  const date = dateElement.value;

  todoList.push({
    name,
    date
  });

  displayTodoList();

  todoElement.value = '';
}

function displayTodoList() {
  let todoListHTML = '';
  document.querySelector('.js-display-todo').innerHTML = todoListHTML;

  for (let i = 0; i < todoList.length; i++) {
    const { name, date } = todoList[i];
    todoListHTML = todoListHTML + `
    <div>
    ${name}
    </div>
    <div>
    ${date}
    </div>
    <button class="delete-button" onclick="
    todoList.splice(${i}, 1);
    displayTodoList();
    ">
    Delete 
    </button>
  `;
    document.querySelector('.js-display-todo').innerHTML = todoListHTML;
  }
}

function handleTodoKeyDown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}