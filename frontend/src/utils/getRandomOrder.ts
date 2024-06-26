export const getRandomOrder = (n: number) => {
  const arr = Array.from({ length: n }, (_, i) => i + 1)

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}
