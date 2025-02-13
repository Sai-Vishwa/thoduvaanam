const date2 = new Date();
const date1 = new Date(date2.getTime()+5.5*60*60*1000);

const diffSeconds = Math.floor((date1 - date2) / 1000); // Convert ms to seconds
const diffMinutes = Math.floor(diffSeconds / 60); // Convert seconds to minutes
const remainingSeconds = diffSeconds % 60; // Remaining seconds

console.log(`Minutes: ${diffMinutes}, Seconds: ${remainingSeconds}`);

