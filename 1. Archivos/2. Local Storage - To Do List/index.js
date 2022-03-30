const form = document.getElementById("form");
const listParent = document.getElementById("list");
const inputForm = document.getElementById("inputForm");

form.addEventListener("submit", e => {
    e.preventDefault()

    addTask();
})

const addTask = () => {
    if (inputForm.value === "") {
        console.log("¡Este campo no puede estar vacío!");
    }

    localStorage.setItem("toDos", JSON.stringify({
        toDos: inputForm.value,
        completed: false
    }))
}