exports.selectDocBasedOnStats = (docs) => {
  // Calculate the cumulative stats
  const cumulativeStats = docs.reduce((acc, doc) => acc + doc.stats, 0);

  // Randomly generate a number between 0 and the cumulative stats
  const randomNum = Math.random() * cumulativeStats;

  // Determine which document to select based on the random number and cumulative stats
  let cumulativeCount = 0;
  for (const doc of docs) {
    cumulativeCount += doc.stats;
    if (randomNum < cumulativeCount) {
      return doc; // Return the selected doc immediately
    }
  }
  return null; // Return null if no document is selected (this should not happen if docs are properly formatted)
};
