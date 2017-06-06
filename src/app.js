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
    var todo = {name:app.todo.value, state: false};
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

  app.toggleTodo = function(index, todoCard) {
    app.todos[index].state = !app.todos[index].state;
    if(app.todos[index].state) {
      todoCard.querySelector(".name").classList.add('crossed');
    } else {
      todoCard.querySelector(".name").classList.remove('crossed');
    }
    localStorage.setItem("todos", JSON.stringify(app.todos));
  };

  app.displayTodo = function(todo, index) {
      if(todo) {
        var todoCard = app.todoTemplate.cloneNode(true);
        todoCard.classList.remove('todoTemplate');
        todoCard.querySelector('.name').textContent = todo.name;
        if(todo.state) {
          todoCard.querySelector(".name").classList.add('crossed');
        }
        todoCard.querySelector('.chkState').checked = todo.state;
        todoCard.removeAttribute('hidden');
        todoCard.querySelector('.btnDel').addEventListener('click', function() {
            app.deleteTodo(index, todoCard)
        });
        todoCard.querySelector('.chkState').setAttribute("id", "todo_" + todo.name);
        todoCard.querySelector('.chkStateLabel').setAttribute("for", "todo_" + todo.name);

        todoCard.querySelector('.chkState').addEventListener('click', function() {
          app.toggleTodo(index, todoCard)
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