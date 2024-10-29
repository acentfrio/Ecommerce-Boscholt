import { capitalizeFirstLetter, truncateText, slugify } from '../stringUtils';

describe('stringUtils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('world')).toBe('World');
    });

    it('should handle empty strings', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    it('should handle single letter strings', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
    });
  });

  describe('truncateText', () => {
    it('should truncate text longer than maxLength', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
    });

    it('should not truncate text shorter than maxLength', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
    });

    it('should handle empty strings', () => {
      expect(truncateText('', 5)).toBe('');
    });
  });

  describe('slugify', () => {
    it('should convert string to slug format', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('This is a TEST')).toBe('this-is-a-test');
      expect(slugify('Special @#$% Characters')).toBe('special-characters');
    });

    it('should handle multiple spaces and dashes', () => {
      expect(slugify('multiple   spaces')).toBe('multiple-spaces');
      expect(slugify('multiple---dashes')).toBe('multiple-dashes');
    });
  });
}); 