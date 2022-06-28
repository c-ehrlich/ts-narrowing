/*
 * Lesson 3: Custom Type Guards
 * - often we want to create functions for this stuff, so that we can use them in many places
 *
 * 1. type predicates
 * 2. the unknown type
 * 3. custom guards
 * 4. error guard
 * 5. warning guard
 * 6. falsy guard
 * 7. formatErrorMessage() with custom guards
 * 8. narrowing by exclusion
 * 9. truthy guards
 */

// 1. type predicates

// !!! THIS DOESN'T WORK
// !!! HOVER THE LAST FUNCTION LINE... CAN STILL BE STRING OR NUMBER
function isString(value: unknown): boolean {
  return typeof value === 'string';
}
function testIsString(value: string | number) {
  if (isString(value)) {
    return 'Error: ' + value;
  }
  return 'Error number: ' + value;
}
// !!! END BIT THAT DOESN'T WORK

// there's a way to fix this
// TS now understands that isString is a type guard
function correctIsString(value: unknown): value is string {
  return typeof value === 'string';
}
function testCorrectIsString(value: string | number) {
  if (correctIsString(value)) {
    return 'Error string: ' + value;
  }
  return 'Error number: ' + value;
}
// `value is string` is a type predicate
// to create a custom type guard, make a function that returns a type predicate
// all type predicates take the form `{ parameter } is { type }`

// 2. the unknown type
// unlike any, unknown won't just let you do anything to the data in it
// instead, it assumes we don't know what the data is, and then we have to
// use type predicates to make it clear

// 3. custom guards
// (start from now)

// 4. error guard
function isError(value: unknown): value is Error {
  return value instanceof Error;
}

// 5. warning guard
// this is more difficult! in section 2 we could use `in` to check for warning
// because there was a limited amount of things our value could be
// here because the input is `unknown`, it could be literally anything
// we need to check that it's an object, that it's not null, and that it has
// the property we're looking for
// TODO maybe we also want to check that it doesn't have any other keys?
function isWarning(value: unknown): value is Warning {
  return typeof value === 'object' && value !== null && 'text' in value;
}

// 6. falsy guard

// this works, but there are problems
// typeof NaN === 'number', so we can't test for that
// also we're not testing for infinity
// there is a proposal to add integer, float, NaN, and Infinity types
// which might make this better in the future
type Falsy = false | 0 | -0 | 0n | '' | null | undefined;

function isFalsy(value: unknown): value is Falsy {
  return value == false;
}

// 9. truthy guard
type Truthy<T> = Exclude<T, Falsy>;

function isTruthy<T extends unknown>(value: T): value is Truthy<T> {
  return value == true;
}

// test the truthy
const isThisTruthy = 'abc' as null | string | 0;
if (isTruthy(isThisTruthy)) {
  // isThisTruthy can only be a string here
  isThisTruthy.trim();
}
