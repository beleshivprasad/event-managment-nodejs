const capitalizeText = (text = "") => {
  // convert text statment to array of words
  const wordsArray = text.split(" ");
  // captilize each word in array
  const filteredWords = wordsArray.map(word => `${word[0].toUpperCase()}${word.slice(1)}`);
  // join by single space (" ") and return
  return filteredWords.join(" ");
};

module.exports = { capitalizeText };
