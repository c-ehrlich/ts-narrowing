/*
 * Lesson 2: Fundamental Type Guards
 * 1. typeof
 * 2. in
 * 3. equality narrowing
 * 4. truthiness narrowing
 * 5. control flow analysis
 * 6. instanceof
 * 7. never
 */

// 1. typeof
function formatErrorMessage1(value: string | Error): string {
  const prefix = 'Error: ';

  // if it's a string, return the string with the prefix
  if (typeof value === 'string') {
    return prefix + value;
  }

  // if it's an Error, return the Error.message with the prefix
  return prefix + value.message;
}

// 2. in
interface Warning {
  text: string;
}

function formatErrorMessage2(value: string | Error | Warning): string {
  const prefix = 'Error: ';

  if (typeof value === 'string') {
    return prefix + value;
  }

  // If it's a Warning, return the Warning.text with the prefix
  if ('text' in value) {
    return prefix + value.text;
  }

  return prefix + value.message;
}

// 3. equality narrowing
// this works but it's not idiomatic
function formatErrorMessage3(
  value: string | Error | Warning | null | undefined
): string {
  const prefix = 'Error: ';

  // check for `null` or `undefined` values
  if (value === null || value === undefined) {
    return prefix + 'Unknown';
  }

  if (typeof value === 'string') {
    return prefix + value;
  }

  if ('text' in value) {
    return prefix + value.text;
  }

  return prefix + value.message;
}

// 4. truthiness narrowing
// this is more idiomatic... but also has some dangers (0 and "" are falsy)
function formatErrorMessage4(
  value: string | Error | Warning | null | undefined
): string {
  const prefix = 'Error: ';

  // Check if it's fasly (null, undefined, empty string)
  if (!value) {
    return prefix + 'Unknown';
  }

  if (typeof value === 'string') {
    return prefix + value;
  }

  if ('text' in value) {
    return prefix + value.text;
  }

  return prefix + value.message;
}

// 5. Control flow analysis
// Analysis of code based on reachability
// Example: in 4. we check for everything EXCEPT error type
// ...so by the time we get to the last line, we KNOW it's an Error
// ...(hover `value` to see that TS understands this )

// 6. instanceof
// check if something is an instance of a specific class
function formatErrorMessage6(
  value: string | Error | Warning | null | undefined
): string {
  const prefix = 'Error: ';

  // Check if it's fasly (null, undefined, empty string)
  if (!value) {
    return prefix + 'Unknown';
  }

  if (typeof value === 'string') {
    return prefix + value;
  }

  if ('text' in value) {
    return prefix + value.text;
  }

  // did value come from Error class
  if (value instanceof Error) {
    return prefix + value.message;
  }

  // we will never reach this unless the function is called
  // with incorrect arguments at runtime
  // At this point, `value` is `never` (see 7.)
  throw new Error(`Invalid value type`);
}

// 7. type never
// represents something that is impossible / should never happen
