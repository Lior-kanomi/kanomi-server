exports.findNewestVersion = (currentVersion, dbVersion) => {
  const compareVersions = (version1, version2) => {
    const segmentsA = version1.split(".").map(Number);
    const segmentsB = version2.split(".").map(Number);

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

  return compareVersions(currentVersion, dbVersion) >= 0;
};
