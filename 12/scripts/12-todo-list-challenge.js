todoList = JSON.parse(localStorage.getItem('todoList')) || [];

displayTodoList();

document.querySelector('.js-add-button').addEventListener('click', () => {
  addTodo();
});

document.querySelector('.js-todo-input').addEventListener('keydown', (event) => {
  handleTodoKeyDown(event);
});

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
  saveList();

  todoElement.value = '';
}

function displayTodoList() {
  let todoListHTML = '';
  document.querySelector('.js-display-todo').innerHTML = todoListHTML;

  todoList.forEach((value, index) => {
    const { name, date } = value;
    todoListHTML = todoListHTML + `
      <div>
      ${name}
      </div>
      <div>
      ${date}
      </div>
      <button class="js-delete-button delete-button">
      Delete 
      </button>
    `;
  });
  document.querySelector('.js-display-todo').innerHTML = todoListHTML;
  document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      displayTodoList();
      saveList();
    });
  });
}

function handleTodoKeyDown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

function saveList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}