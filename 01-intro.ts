/*
 * What is type narrowing?
 * Restricting a broader type to something more specific
 * - restricting `string` to `abc`
 * - restricting `number` to `123`
 *
 * Why? To handle cases individually
 *
 * const do something = (value: string | number | boolean) => {
 *   // if it's a string, do one thing
 *   // if it's a number, do another thing
 *   // if it's a boolean, do this other thing
 * }
 *
 * Narrowing is not just a typescript issue ... we also had it in JS
 * `if (typeof value === 'string') { doThing() }`
 *
 * Narrowing ref in TS docs
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html
 */
