export function createEmbedding(text: string): number[] {
  const dimensions = 384;
  const vector = new Array(dimensions).fill(0);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  for (const word of words) {
    let hash = 0;

    for (let i = 0; i < word.length; i++) {
      hash = (hash * 31 + word.charCodeAt(i)) % dimensions;
    }

    vector[hash] += 1;
  }

  const magnitude = Math.sqrt(
    vector.reduce((sum, value) => sum + value * value, 0)
  );

  if (magnitude > 0) {
    return vector.map((value) => value / magnitude);
  }

  return vector;
}