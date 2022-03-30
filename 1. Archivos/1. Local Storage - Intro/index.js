//? https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

// Con un "string" no nos da mayor problema:
const saveStringStorage = () => {
    const mascota = "Pocho";
    localStorage.setItem("perro", mascota);
};

saveStringStorage();

// Con un "object", sí:
const saveObjectStorage = () => {
    const productos = [{
            id: 1,
            tipo: "bebida",
            nombre: "coca cola"
        },
        {
            id: 2,
            tipo: "comida",
            nombre: "huevo frito"
        },
        {
            id: 3,
            tipo: "comida",
            nombre: "hamburguesa"
        }
    ]

    //! Esto nos da un "Object Object":
    //? https://www.w3schools.com/js/js_object_display.asp
    //* localStorage.setItem("cosas_guardadas", productos);

    //? Solución: https://www.w3schools.com/js/js_json_stringify.asp
    localStorage.setItem("cosas_guardadas", JSON.stringify(productos));
};

saveObjectStorage();

const loadLocalStorage = () => {
    //* console.log(localStorage.getItem("cosas_guardadas")); // Esto nos va a devolver un "string" porque lo habíamos guardado como un "string".

    //* console.log(typeof localStorage.getItem("cosas_guardadas"));

    //! Entonces la reconvertimos a "objeto":
    console.log(JSON.parse(localStorage.getItem("cosas_guardadas")));

    console.log(typeof JSON.parse(localStorage.getItem("cosas_guardadas")));
};

loadLocalStorage();