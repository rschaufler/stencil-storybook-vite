declare module 'rollup/parseAst' {
  // Minimal types to satisfy Vite's import
  interface ParseOptions {
    allowReturnOutsideFunction?: boolean
    jsx?: boolean
    signal?: AbortSignal
  }

  interface AstNode {
    type: string
    [key: string]: unknown
  }

  export function parseAst(input: string, options?: ParseOptions): AstNode
  export function parseAstAsync(input: string, options?: ParseOptions): Promise<AstNode>
}
