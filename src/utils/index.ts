export function encodePath(path: string): string {
    while (path.includes('/')) {
      path = path.replace('/', '%2F');
    }
    return path;
  }
   
  export function decodePath(path: string): string {
    while (path.includes('%2F')) {
      path = path.replace('%2F', '/');
    }
    return path;
  }