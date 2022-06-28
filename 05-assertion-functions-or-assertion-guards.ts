/*
 * Assertion Function (aka Assertion Guards)
 * 1. Assertion Functions vs Type Guards
 * 2. Early Exits
 * 3. Issues with Control Flow Analysis
 * 4. Function Expressions with Predefined Types
 * 5. Assertions without a Type Predicate
 */

// 1. Assertion Functions vs Type Guards
// they ar esimilar to type guards
// in our type guard isString:
// - if it's a string: return true
// - if it's not a string: return false
// in the equivalent assertion function:
// - if it's a string: empty return
// - if it's not a string: throw

// all the code after this function will only run if value is a string
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw Error('value is not a string');
}

// 2. Early exits

// let's create zod

/** Expected body for POST /api/users */
interface CreatableUser {
  name: string;
  email: string;
  password: string;
}

function assertIsCreatableUser(value: unknown): asserts value is CreatableUser {
  if (typeof value !== 'object') throw Error('Creatable user is not an object');
  if (value === null) throw Error('Creatable user is null');
  assertHasProps(['name', 'email', 'password'], value);
  assertIsName(value.name);
  assertIsEmail(value.email);
  assertIsPassword(value.password);
}

function userCreationHandler(req: Request, res: Response): void {
  try {
    // validate the data before anything
    const data = req.body;
    assertIsCreatableUser(data);

    // data is valid, create the user
  } catch (err) {
    // data is invalid, respond with 404
  }
}

// 3. Issues with Control Flow Analysis

// THIS ONLY WORKS WITH FUNCTION DECLARATIONS, NOT FUNCTION EXPRESSIONS

// function declaration: function add(num1: number, num2: number) { return num1 + num2 }
// function expression 1: const add = function(num1: number, num2: number) { return num1 + num2}
// function expression 2: const add = (num1: number, num2: number) => { return num1 + num2 }

// function declarations are hoisted (loaded before code execution), function expressions are not

// two alternatives:
// 1. just use function declarations (see above)
// 2. function expressions with predefined types

// example of 2
// predefined type
type AssertIsString = (value: unknown) => asserts value is string;
// function expression with the predefined type
const assertIsString2: AssertIsString = (value) => {
  if (typeof value !== 'string') throw Error('value is not a string');
};

// predefined type
type AssertIsName = (value: unknown) => asserts value is Name;
// function expression with the predefined type
const assertIsName: AssertIsName = (value) => {
  if (typeof value !== 'string') throw Error('Name is not a string');
  if (value.trim() === '') throw Error('Name is empty');
  if (value.length < 3) throw Error('Name is too short');
  if (value.length > 256) throw Error('Name is too long');
};

// predefinied type
type AssertHasProps = <Prop extends string>(
  props: ReadonlyArray<Prop>,
  value: object
) => asserts value is Record<Prop, unknown>;
// function expression with the predefined type
const assertHasProps: AssertHasProps = (props, value) => {
  // Only objects have properties
  if (typeof value !== 'object') throw Error(`Value is not an object`);

  // Make sure it's not null
  if (value === null) throw Error(`Value is null`);

  // Check if it has the expected properties
  for (const prop of props) {
    if (prop in value === false) throw Error(`Value doesn't have .${prop}`);
  }
};

// 5. Assertion functions without a type predicate
type Assert = (condition: unknown) => asserts condition;
const assert: Assert = (condition) => {
  if (condition == false) throw 'Invalid assertion';
};
// explanation:
// this function signature means that the condition to check is already a type guard
const x = 'abc' as string | number;
// x ... string | number
assert(typeof x === 'string');
// x ... string
