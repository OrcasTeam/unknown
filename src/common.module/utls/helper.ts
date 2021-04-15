import * as path from 'path';

export const root = path.join(__dirname, '../../');

export function resolve(p: string): string {
  return path.join(root, p);
}
