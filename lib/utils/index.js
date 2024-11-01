export function formatDate(date = new Date()) {
    return date.toISOString();
}

export function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
