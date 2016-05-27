var profaneWords = [
  { word: 'bullshit', replacement: 'blatantly false' },
  { word: 'shit', replacement: 'doody' },
];

function cleanUpProfanity(text) {
  var suspectText = text;
  var cleanText = '';
  profaneWords.forEach(function (pottyWord) {
    cleanText = suspectText.replace(pottyWord.word, pottyWord.replacement);
    suspectText = cleanText;
  });

  return cleanText;
}

module.exports = cleanUpProfanity;
