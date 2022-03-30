//? https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

const nums = ["one", "two", "three"];

// "Destructuré", lo saqué del "array":
const [uno, dos, tres] = nums; // Asigné cada valor a una variable.

//* console.log(nums[0]);
const uno2 = nums[0];
const dos2 = nums[1];
const tres2 = nums[2];

console.log(dos);
console.log(tres2);

const objetito = {
    nombre: "Pocho",
    patas: 3,
    trucos: ["mover la cola", "traer la pelota", "dormir la siesta"],
    moverCola: function () {
        console.log("mover cola")
    }
};

// Forma tradicional:
//* console.log(objetito.trucos[0]);

// Destructurando un objeto:
const {
    nombre,
    patas,
    trucos,
    moverCola
} = objetito;

console.log(trucos[1]);

// Ahora podemos llamarla como una función sin tener que acceder al objeto:
moverCola();