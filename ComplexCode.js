/* 
   Filename: ComplexCode.js 
   Content: Complex code demonstrating advanced JavaScript concepts and functionalities 
*/

// Importing necessary modules
const moment = require('moment');
const axios = require('axios');

// Constants
const BASE_URL = 'https://api.example.com';
const API_KEY = 'your_api_key';

// Class definition
class ComplexClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  logDetails() {
    console.log(`Name: ${this.name}`);
    console.log(`Age: ${this.age}`);
  }

  async fetchData() {
    try {
      const response = await axios.get(`${BASE_URL}/endpoint`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  static staticMethod() {
    console.log('This is a static method.');
  }
}

// Function definition
function complexFunction(number) {
  let sum = 0;

  for (let i = 1; i <= number; i++) {
    sum += i;
  }

  return sum;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded.');
});

window.addEventListener('resize', () => {
  console.log('Window resized.');
});

// Variable declaration
const name = 'John Doe';
let age = 25;

// Conditional statements
if (age >= 18) {
  console.log(`${name} is an adult.`);
} else {
  console.log(`${name} is a minor.`);
}

// Looping constructs
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

let i = 1;
while (i <= 10) {
  console.log(i);
  i++;
}

// Object literal
const person = {
  name: 'Jane Smith',
  age: 30,
  profession: 'Engineer',
};

console.log(person);

// Class instantiation and function invocation
const instance = new ComplexClass('Alice', 22);
instance.logDetails();

const result = complexFunction(100);
console.log(`Result: ${result}`);

// Exporting module
module.exports = {
  ComplexClass,
  complexFunction,
};