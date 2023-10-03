exports.findNewestVersion = (documents) => {
  if (documents.length === 0) {
    throw new Error("No documents provided");
  }

  const compareVersions = (versionA, versionB) => {
    const segmentsA = versionA.split(".").map(Number);
    const segmentsB = versionB.split(".").map(Number);

    for (let i = 0; i < Math.max(segmentsA.length, segmentsB.length); i++) {
      const segmentA = segmentsA[i] || 0;
      const segmentB = segmentsB[i] || 0;

      if (segmentA > segmentB) {
        return 1;
      }
      if (segmentA < segmentB) {
        return -1;
      }
    }

    return 0;
  };

  let newestDocument = documents[0];
  for (let i = 1; i < documents.length; i++) {
    const doc = documents[i];
    if (
      compareVersions(doc.uaFullVersion, newestDocument.uaFullVersion) === 1
    ) {
      newestDocument = doc;
    }
  }

  return newestDocument._doc;
};
