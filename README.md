1. What is the difference between var, let, and const?

Answer: var: This is the "old" way. It is function-scoped and can be re-declared and updated. 

let: The modern choice for variables that need to change. It is block-scoped (stays inside the {} ) and cannot be re-declared in the same scope.

const: Short for "constant." Like let, it is block-scoped, but it cannot reassign its value once it is set. 

2. What is the spread operator (...)?

Answer: The spread operator looks like three dots ... and it's used to "unpack" or spread elements from an array or objects.

In objects, it helps copy properties from one object to another without changing the original.

3. What is the difference between map(), filter(), and forEach()?

Answer: forEach(): It just a loop. It goes through every item in a list and does something but it doesn't return anything new.

map(): A "transformer." It goes through a list and creates a new list where every item has been changed based on instructions.

filter(): A "selector." It looks through a list and creates a new list containing only the items that pass a specific test .

4. What is an arrow function?

Answer: An arrow function is a shorter way to write functions in JavaScript. Instead of using the function keyword, use =>.

Standard: function(x) { return x * 2 }

Arrow: (x) => x * 2

5. What are template literals?

Answer: Template literals allow to create strings using backticks (`) instead of quotes. They make it much easier to put variables inside strings using the ${variable} syntax. 


