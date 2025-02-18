const utc = new Date();
const tomorrow830AM = new Date(utc.getTime()+5.5*60*60*1000);
tomorrow830AM.setDate(tomorrow830AM.getDate() + 1);
tomorrow830AM.setHours(14, 0, 0, 0);

console.log(tomorrow830AM);
