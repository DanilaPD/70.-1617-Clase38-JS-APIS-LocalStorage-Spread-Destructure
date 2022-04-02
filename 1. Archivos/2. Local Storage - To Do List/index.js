const form = document.getElementById("form");
const listParent = document.getElementById("list");
const inputForm = document.getElementById("inputForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTask();
});

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
            // Cuando termina de agregar, lo va a volver a hacer "string" para que quede en el " local storage".
            // Al estar en un "objeto", podemos trabajar con los "...", por eso, el "parse".
            // "getItem" necesita el "parse".
            // Estos "..." nos van a explotar el "array" y nos van a meter los elementos nuevos al mismo nivel. Nos abre el "array" de nombre "todos" (la key) y si no hay nada, crea el "array" vacío, yo lo lleno [].
            // Es decir, si tenés algo, le metemos todo lo nuevo adentro. Sino, traemos ese "array" vacío y empezamos a meter.

            {
                todos: inputForm.value,
                completed: false,
            }
        ])
    );

    const list = document.createElement("li");
    list.innerHTML = `
    <input type="checkbox" onclick="toDoComplete(this)" class="check">
    <input type="text" value="${inputForm.value}">
    <i class="fa fa-trash"></i>
    `;
    listParent.insertBefore(list, listParent.children[0]);
    inputForm.value = "";
};

const loadTasks = () => {
    if (localStorage.getItem("todos") == null) return;

    // Caso contrario:
    // Crea un "objeto" desde un "objeto" que sea de "tipo array".
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));
    console.log(todos);
    todos.forEach((todo) => {
        const list = document.createElement("li");
        list.innerHTML = `
        <input type="checkbox" onclick="toDoComplete(this)" class="check ${
          todo.completed ? "checked" : ""
        }">
        <input type="text" value="${todo.todos}">
        <i class="fa fa-trash"></i>
        `;
        listParent.insertBefore(list, listParent.children[0]);
    });
};

loadTasks();