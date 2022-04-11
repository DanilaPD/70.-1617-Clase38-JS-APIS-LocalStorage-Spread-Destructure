//? https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
//? https://developer.mozilla.org/es/docs/Web/API/Node/nextSibling
//? https://developer.mozilla.org/es/docs/Glossary/Hoisting
//? https://developer.mozilla.org/es/docs/Web/API/GlobalEventHandlers/onLoad

const form = document.getElementById("form");
const listParent = document.getElementById("list");
const inputForm = document.getElementById("inputForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTask();
});

//* Agregar las tareas:
const addTask = () => {
    if (inputForm.value === "") {
        console.log("¡Este campo no puede estar vacío!");
        return false;
    };

    localStorage.setItem(
        "todos",
        JSON.stringify([
            ...JSON.parse(localStorage.getItem("todos") || "[]"),
            // Este "setItem" necesita el "stringify".
            // Cuando termina de agregar, lo va a volver a hacer "string" para que quede en el "LocalStorage".
            // Al estar en un "objeto", podemos trabajar con los "...", por eso, el "parse".
            // "getItem" necesita el "parse".
            // Estos "..." nos van a explotar el "array" y nos van a meter los elementos nuevos al mismo nivel. Nos abre el "array" de nombre "todos" (la key) y si no hay nada, crea el "array" vacío y yo lo lleno [].
            // Es decir, si tenés algo, le metemos todo lo nuevo adentro. Sino, traemos ese "array" vacío y empezamos a llenarlo.

            {
                todos: inputForm.value,
                completed: false,
            },
        ])
    );

    const list = document.createElement("li");
    list.innerHTML = `
    <input type="checkbox" onclick="todoComplete(this)" class="check">
    <input type="text" value="${inputForm.value}" onfocus="getCurrentTodo(this)" onblur="editTodo(this)">
    <i class="fa fa-trash onclick="removeTodo(this)"></i>
    `;
    listParent.insertBefore(list, listParent.children[0]);
    inputForm.value = ""; // Con esto, limpio el "form".
};

//* Traer las tareas:
const loadTasks = () => {
    if (localStorage.getItem("todos") == null) return; // Si no hay nada, no hay nada que cargar.

    // Caso contrario:
    // Crea un "objeto" desde un "objeto" que sea de "tipo array".
    let todos = Array.from(JSON.parse(localStorage.getItem("todos"))); // Si hay algo que cargar, traemos lo que estaba en el "LocalStorage".

    //* console.log(todos);

    // Ahora que nos trajimos todo, y en un "objeto", lo podemos recorrer para trabajarlo:
    todos.forEach((todo) => {
        const list = document.createElement("li");
        list.innerHTML = `
        <input type="checkbox" onclick="todoComplete(this)" class="check ${
          todo.completed ? "checked" : ""
        }">
        <input type="text" value="${todo.todos}" onfocus="getCurrentTodo(this)" onblur="editTodo(this)">
        <i class="fa fa-trash onclick="removeTodo(this)"></i>
        `;
        listParent.insertBefore(list, listParent.children[0]);
    });
};

const todoComplete = (e) => {
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

    todos.forEach((todo) => {
        if (todo.todos === e.nextElementSibling.value) { // Busca al "hermano" y ve si el "value" matchea con lo que hay en el "LocalStorage".
            todo.completed = !todo.completed; // Si está "completado", que pase a "no completado".
        }

        localStorage.setItem("todos", JSON.stringify(todos)); // Grabamos el cambio que hayamos hecho.
        e.nextElementSibling.classlist.toggle("completed"); //! Cambio la "clase" para ponerle algún estilo cuando termine la tarea.
    });
};

const removeTodo = (e) => {
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

    todos.forEach((todo) => {
        if (todo.todos === e.parentNode.children[1].value) { // Busca al "padre", baja al "segundo hijo" y ve si el "value" matchea con el "LocalStorage".

            //* console.log(e.parentNode.children[1].value); 

            todos.splice(todos.indexOf(todo), 1);
            // Buscá en el "array" el primero que matchee con ese "todo"; si lo encontrás, sacalo.
        }
        localStorage.setItem("todos", JSON.stringify(todos));
        e.parentNode.remove(); // No quiero eliminar el "input", quiero matar todo el "li" directamente.
    });
};

const editTodo = (e) => {
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

    if (e.value === "") {
        alert("Este campo no puede estar vacío.")
        e.value = currentValue; // Si no hay "valor", ponele el que ya estaba.
        return;
    };

    // Si está todo bien, hacé lo siguiente:
    todos.forEach((todo) => {
        if (todo.todos === currentValue) {
            todo.todos = e.value; // Le cambio el "valor" a lo que tenga el "input".
        };
    })
    localStorage.setItem("todos", JSON.stringify(todos)); // Grabo el "valor".
};

// Lo inicio vacío, pero no puede ser un "const" porque lo vamos a estar cambiando permanentemente, vamos a estar metiéndole valor. Y, además, necesitamos que esté "afuera" porque lo vamos a acceder varias veces.
let currentValue = null; // Acá guardamos temporalmente el "valor" que tenga el "input".

const getCurrentTodo = (e) => {
    currentValue = e.value;
};

// En lugar de probar cada función llamándola, le digo que el "load" lo haga apenas tenga la ventana lista:  
//* loadTasks();
window.onload = loadTasks;