/**
 * Get a specified number of random elements from an array.
 *
 * @param {Array} array - The array to select random elements from.
 * @param {number} count - The number of random elements to retrieve.
 * @returns {Array} An array containing the randomly selected elements.
 */
function getRandomElementsFromArray(array, count) {
    const shuffledArray = array.slice(); // Create a copy of the original array
    let currentIndex = shuffledArray.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap it with the current element
        temporaryValue = shuffledArray[currentIndex];
        shuffledArray[currentIndex] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temporaryValue;
    }

    // Return the first 'count' elements from the shuffled array
    return shuffledArray.slice(0, count);
}

module.exports = { getRandomElementsFromArray };
