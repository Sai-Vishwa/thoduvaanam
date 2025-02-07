const utc = new Date();
const now = new Date(utc.getTime()+5.5*60*60*1000);
console.log(now)
const tenmins = new Date(now.getTime()+10*60*1000)
console.log(now<tenmins)