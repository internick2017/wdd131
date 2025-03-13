const radiusOutput = document.getElementById('radius');
const areaOutput = document.querySelector('#area'); // Error #1: Incorrect selector

let area = 0;
const PI = 3.14159;
let radius = 10; // Error #3: Using const when value will change later
area = PI * radius * radius;
radiusOutput.textContent = radius; // Error #4: Missing .textContent
areaOutput.textContent = area; // Error #5: Missing .textContent

radius = 20;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;