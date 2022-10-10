export const getPairs = (arr) => {
  let pairs = [];
  arr.forEach((val, index) => {
    if (index % 2 === 0) {
      pairs.push([]);
    }
    pairs[Math.floor(index / 2)].push(val);
  });
  return pairs;
};

function analyzePattern(values, pairs) {
  let countPairs = pairs.length;
  let countFree = values.length - 2 * countPairs;
  return _analyzePattern(countFree, countPairs, countPairs, 0, {});
}

function _analyzePattern(countFree, countPairs, minDistance, toFree, cache) {
  const key = `${countFree} ${countPairs}, ${toFree}`;
  const state = [countFree, countPairs, toFree];
  if (!cache[key]) {
    if (0 === Math.max(countFree, countPairs)) {
      if (toFree) {
        cache[key] = [0, undefined, state];
      } else {
        cache[key] = [1, undefined, state];
      }
    } else {
      const answer = {};
      let total = 0;
      if (toFree % 2) {
        // We will be adding a free after this.

        // Analyze using a free value here.
        let result = _analyzePattern(
          countFree,
          countPairs,
          minDistance,
          toFree >> 1,
          cache
        );
        let countUseFree = result[0] * countFree;
        total = countUseFree;
        answer["free"] = [countUseFree, result[1], result[2]];

        // Analyze using the first of a pair here.
        if (countPairs) {
          // Mark that there is an upcoming value to free.
          toFree += 2 ** minDistance;
          result = _analyzePattern(
            countFree + 1,
            countPairs - 1,
            minDistance,
            toFree >> 1,
            cache
          );
          let countUsePair = result[0] * 2 * countPairs;
          total += countUsePair;
          answer["pair"] = [countUsePair, result[1], result[2]];
        }
      } else {
        // We will not be adding a free after this.
        if (countFree) {
          let result = _analyzePattern(
            countFree - 1,
            countPairs,
            minDistance,
            toFree >> 1,
            cache
          );
          let countUseFree = result[0] * countFree;
          total = countUseFree;
          answer["free"] = [countUseFree, result[1], result[2]];
        }

        // Analyze using the first of a pair here.
        if (countPairs) {
          // Mark that there is an upcoming value to free.
          toFree += 2 ** minDistance;
          let result = _analyzePattern(
            countFree,
            countPairs - 1,
            minDistance,
            toFree >> 1,
            cache
          );
          let countUsePair = result[0] * 2 * countPairs;
          total += countUsePair;
          answer["pair"] = [countUsePair, result[1], result[2]];
        }
      }
      cache[key] = [total, answer, state];
    }
  }
  return cache[key];
}

function randomPattern(analysis, state) {
  if (!analysis) {
    return "";
  }

  if (!state) {
    state = analysis[2];
  }
  const total = analysis[0];
  const remaining = analysis[1];
  if (remaining) {
    if (remaining["free"]) {
      const odds = (remaining["free"][0] * state[0]) / total;
      if (Math.random() < odds) {
        return "f" + randomPattern(remaining["free"], state);
      } else {
        return "p" + randomPattern(remaining["pair"], state);
      }
    } else {
      return "p" + randomPattern(remaining["pair"], state);
    }
  } else {
    return "";
  }
}

export function randomPermutation(values, pairs) {
  let inPairs = {};
  for (let p of pairs) {
    inPairs[p[0]] = 1;
    inPairs[p[1]] = 1;
  }

  let freeValues = [];
  for (let v of values) {
    if (!inPairs[v]) {
      freeValues.push(v);
    }
  }

  let freePairs = Array.from(pairs);
  let distance = pairs.length;
  let upcoming = {};

  const pattern = randomPattern(analyzePattern(values, pairs));
  let answer = [];
  for (let c of pattern) {
    if (c === "f") {
      let i = Math.floor(freeValues.length * Math.random());
      let tmp = freeValues[i];
      freeValues[i] = freeValues[freeValues.length - 1];
      freeValues[freeValues.length - 1] = tmp;
      answer.push(freeValues.pop());
    } else {
      let i = Math.floor(freePairs.length * Math.random());
      let tmp = freePairs[i];
      freePairs[i] = freePairs[freePairs.length - 1];
      freePairs[freePairs.length - 1] = tmp;
      let pair = freePairs.pop();
      if (0.5 < Math.random()) {
        answer.push(pair[0]);
        upcoming[pair[1]] = distance;
      } else {
        answer.push(pair[1]);
        upcoming[pair[0]] = distance;
      }
    }

    // Now adjust upcoming.
    let nextUpcoming = {};
    for (const [key, value] of Object.entries(upcoming)) {
      if (value <= 1) {
        freeValues.push(key - 0);
      } else {
        nextUpcoming[key] = value - 1;
      }
    }
    upcoming = nextUpcoming;
  }
  return answer;
}

// const values = [1, 2, 3, 4];
// const pairs = [
//   [1, 3],
//   [2, 4],
// ];

// for (let i = 0; i < 10; i++) {
//   console.log(randomPermutation(values, pairs));
// }
