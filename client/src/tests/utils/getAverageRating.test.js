import getAverageRating from '../../utils/getAverageRating';

describe('getAverageRating', () => {
  it('should return 0 if length of reviews is 0', () => {
    const averageRating = getAverageRating([]);
    expect(averageRating).toEqual(0);
  });
  it('should return average rating if length of reviews is greater than 0', () => {
    const averageRating = getAverageRating([{ rating: 2 }, { rating: 2 }]);
    expect(averageRating).toEqual('2.0');
  });
});

