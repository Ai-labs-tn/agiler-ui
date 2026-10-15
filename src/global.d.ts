/**
 * Ambient declarations for asset imports.
 * CSS Modules resolve to a class-name map; plain CSS is a side-effect import.
 */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css';
