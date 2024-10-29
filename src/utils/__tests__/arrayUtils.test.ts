import { chunk, removeDuplicates, groupBy } from '../arrayUtils';

describe('arrayUtils', () => {
  describe('chunk', () => {
    it('should split array into chunks of specified size', () => {
      const array = [1, 2, 3, 4, 5];
      expect(chunk(array, 2)).equal([[1, 2], [3, 4], [5]]);
    });

    it('should handle empty arrays', () => {
      expect(chunk([], 2)).equal([]);
    });
  });

  describe('removeDuplicates', () => {
    it('should remove duplicate values from array', () => {
      const array = [1, 2, 2, 3, 3, 4];
      expect(removeDuplicates(array)).equal([1, 2, 3, 4]);
    });

    it('should handle arrays with no duplicates', () => {
      const array = [1, 2, 3, 4];
      expect(removeDuplicates(array)).equal([1, 2, 3, 4]);
    });
  });

  describe('groupBy', () => {
    it('should group array items by specified key', () => {
      const array = [
        { id: 1, category: 'A' },
        { id: 2, category: 'B' },
        { id: 3, category: 'A' },
      ];
      
      const result = groupBy(array, 'category');
      expect(result).equal({
        A: [
          { id: 1, category: 'A' },
          { id: 3, category: 'A' },
        ],
        B: [{ id: 2, category: 'B' }],
      });
    });

    it('should handle empty arrays', () => {
      expect(groupBy([], 'category')).equal({});
    });
  });
}); 