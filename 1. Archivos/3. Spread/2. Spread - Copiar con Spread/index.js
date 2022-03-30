let arr1 = ["cajita", 16, true];

// Podemos clonar:
let nuevoArr = [...arr1];
arr1.push("nueva cosa");
nuevoArr.push(3, "san juan");

console.log("arr1:", arr1, "arr2:", nuevoArr);