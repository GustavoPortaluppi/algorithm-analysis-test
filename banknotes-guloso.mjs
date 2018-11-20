export function banknotesCount(p, value) {
  const array = [];
  let sum = 0;
  p.sort((a, b) => {
    return b - a;
  });

  for (const v of p) {
    if (sum < value && (sum + v) <= value) {
      sum += v;
      array.push(v);
    }
  }

  return array;
}