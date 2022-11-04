describe('function name', () => {
  const testCases = [
    {
      toString: () => '1',
    },
  ];

  test.each(testCases)('%s', () => {
    expect(true).toStrictEqual(true);
  });
});
