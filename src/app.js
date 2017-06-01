(function() {
  'use strict';

  var app = {
      todos: {},
      todoDlg: document.querySelector('.todo-dlg-container'),
      todo: document.getElementById('inpTodo'),
      container: document.querySelector('.main'),
      todoTemplate: document.querySelector('.todoTemplate'),
  };


  /* **** add event listeners for UI Elements **** */
  
  document.getElementById('butAdd').addEventListener('click', function() {
    // Open/show the add new city dialog
    app.toggleTodoDlg(true);
  });

  document.getElementById('btnSaveTodo').addEventListener('click', function() {
    app.saveTodo();
  });

  document.getElementById('btnCancel').addEventListener('click', function() {
    app.toggleTodoDlg(false);
  });


  /* **** methods for storing, editing in the UI **** */

  app.toggleTodoDlg = function(visible) {
    if(visible) {
        app.todoDlg.hidden = undefined;
    } else {
        app.todoDlg.hidden = true;
        app.todo.value = '';
    }
  };
  
  app.saveTodo = function() {
    var todo = {name:app.todo.value, state: 'Open'};
    app.todos[app.todo.value] = todo;

    localStorage.setItem('todos', JSON.stringify(app.todos));
    app.displayTodo(todo, app.todo.value);
    app.toggleTodoDlg(false);
  };

  app.deleteTodo = function(index, todoCard) {
    app.container.removeChild(todoCard);
    delete app.todos[index];
    localStorage.setItem('todos', JSON.stringify(app.todos));
    if(Object.keys(app.todos).length === 0) {
        app.toggleTodoDlg(true);
    }
  };

  app.doneTodo = function(index, todoCard) {
    app.todos[index].state = "Done";
    todoCard.querySelector('.state').textContent = "Done";
    localStorage.setItem("todos", JSON.stringify(app.todos));
  };

  app.displayTodo = function(todo, index) {
      if(todo) {
        var todoCard = app.todoTemplate.cloneNode(true);
        todoCard.classList.remove('todoTemplate');
        todoCard.querySelector('.name').textContent = todo.name;
        todoCard.querySelector('.state').textContent = todo.state;
        todoCard.removeAttribute('hidden');
        todoCard.querySelector('.btnDel').addEventListener('click', function() {
            app.deleteTodo(index, todoCard)
        });
        todoCard.querySelector('.btnDone').addEventListener('click', function() {
          app.doneTodo(index, todoCard)
        });
        app.container.appendChild(todoCard);
      }
  };

  app.loadTodos = function() {
    if(Object.keys(app.todos).length === 0) {
        app.toggleTodoDlg(true);
    }
    var i, keys = Object.keys(app.todos);
    for(i=0;i<keys.length;i++) {
      app.displayTodo(app.todos[keys[i]], keys[i]);
    }
  };

  /* **** Code required to start the App **** */

  
  if(localStorage.todos) {
    app.todos = JSON.parse(localStorage.todos);
    app.loadTodos();
  } 


})();