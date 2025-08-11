declare module 'rollup/parseAst' {
  // Minimal types to satisfy Vite's import
  export function parseAst(input: string, options?: any): any;
  export function parseAstAsync(input: string, options?: any): Promise<any>;
}