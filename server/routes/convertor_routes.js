const fs = require('fs');

const valueConversions = {
  '2': ['a', 'b', 'c'],
  '3': ['d', 'e', 'f'],
  '4': ['g', 'h', 'i'],
  '5': ['j', 'k', 'l'],
  '6': ['m', 'n', 'o'],
  '7': ['p', 'q', 'r', 's'],
  '8': ['t', 'u', 'v'],
  '9': ['w', 'x', 'y', 'z']
};

const text = fs
  .readFileSync('./words.txt', 'utf-8')
  .toString()
  .split('\n')
  .map(word => word.toLowerCase());

const letterCombinations = digs => {
  const letters = digs.map(digit => valueConversions[digit] || ['']);

  return letters.reduce((strings, currentEntry) => {
    const combinations = [];
    strings.forEach(current => {
      currentEntry.map(letter => combinations.push(`${current}${letter}`));
    });
    return combinations;
  });
};

module.exports = function(app) {
  app.get('/convertor', (req, res) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');

      const value = req.query.value;
      const digits = value.split('');

      const possibleWords = letterCombinations(digits);
      const words = possibleWords.filter(word => text.includes(word));
      const result = words.join(', ') || `No words match value of ${value}`;

      res.end(result);
    } catch (e) {
      res.end('An error occured');
    }
  });
};
