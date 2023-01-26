export const getRandom= <T>(count: T[]): T => {
    return count[Math.floor(Math.random() * count.length)]
}