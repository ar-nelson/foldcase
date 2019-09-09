const caseTables = require('./case-tables');

function foldcase(s) {
  return Array.from(s)
    .map(c => caseTables.full[c] || c)
    .join('');
}

foldcase.full = function full(s) {
  return foldcase(s);
};

foldcase.simple = function simple(s) {
  return Array.from(s)
    .map(c => caseTables.simple[c] || c)
    .join('');
};

foldcase.charFull = function charFull(c) {
  return caseTables.full[c] || c;
};

foldcase.charSimple = function charSimple(c) {
  return caseTables.simple[c] || c;
};

module.exports = foldcase;
