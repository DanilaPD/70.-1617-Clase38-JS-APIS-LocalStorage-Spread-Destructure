const arr1 = [15, 3, 22];
const arr2 = ["peras", "manzanas"];

// Concatenar de forma tradicional:
//* const arr3 = arr1.concat(arr2);

// Alternativa con "spread":
const arr3 = [...arr1, ...arr2];

console.log(arr3);