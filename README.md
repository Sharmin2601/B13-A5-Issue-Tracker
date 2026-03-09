1. What is the difference between var, let, and const?
var: This is the "old" way. It is function-scoped and can be re-declared and updated. It also gets "hoisted," meaning you can sometimes use it before it's defined, which often leads to bugs.

let: The modern choice for variables that need to change. It is block-scoped (stays inside the {} where it was born) and cannot be re-declared in the same scope.

const: Short for "constant." Like let, it is block-scoped, but you cannot reassign its value once it is set. It’s best for data that should stay the same, like an API URL.

2. What is the spread operator (...)?
The spread operator looks like three dots ... and it's used to "unpack" or spread elements from an array or objects.

In arrays, it’s great for combining two lists: [...list1, ...list2].

In objects, it helps copy properties from one object to another without changing the original.

3. What is the difference between map(), filter(), and forEach()?
forEach(): Just a loop. It goes through every item in a list and does something (like a console.log), but it doesn't return anything new.

map(): A "transformer." It goes through a list and creates a new list where every item has been changed based on your instructions.

filter(): A "selector." It looks through your list and creates a new list containing only the items that pass a specific test (like finding only "Open" issues).

4. What is an arrow function?
An arrow function is a shorter way to write functions in JavaScript. Instead of using the function keyword, you use =>.

Standard: function(x) { return x * 2 }

Arrow: (x) => x * 2
They are not just shorter; they also handle the this keyword differently, making them very popular for use inside array methods like map or filter.

5. What are template literals?
Template literals allow you to create strings using backticks (`) instead of quotes. They make it much easier to put variables inside strings using the ${variable} syntax. This is exactly how we injected the dynamic HTML cards into our Issue Tracker without messy string concatenation.