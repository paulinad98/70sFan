import { describe, it, expect } from 'vitest';

import capitalize from '@/utils/capitalize';

describe('capitalize function', () => {
  it('should capitalize the first letter of a word', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
    expect(capitalize('typescript')).toBe('Typescript');
  });

  it('should return an empty string if no word is provided', () => {
    expect(capitalize('')).toBe('');
  });
});
