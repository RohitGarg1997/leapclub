const shuffleArray = arr => {
  var i = arr.length,
    j,
    temp;
  if (i == 0) return arr;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

const cards = [
  {name: 'A'},
  {name: 'B'},
  {name: 'C'},
  {name: 'D'},
  {name: 'E'},
  {name: 'F'},
  {name: 'G'},
  {name: 'H'},
];

const CARDS_IN_ROW = 4;

export {shuffleArray, cards, CARDS_IN_ROW};
