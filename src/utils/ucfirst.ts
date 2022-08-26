/**
 * Switch the first latter of a string in uppercase.
 * @param {string} str
 */
export default function ucfirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
