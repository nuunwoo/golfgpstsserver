class Timer {
  date: Date;
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  millisecond: string;
  currentTime: string;

  constructor() {
    this.date = new Date();
    this.year = '';
    this.month = '';
    this.day = '';
    this.hour = '';
    this.minute = '';
    this.second = '';
    this.millisecond = '';
    this.currentTime = '';
  }

  setDigit(num: number) {
    if (num < 10) return `0${num}`;
    else return `${num}`;
  }

  getCurrentTime() {
    this.date = new Date();
    this.year = this.setDigit(this.date.getFullYear());
    this.month = this.setDigit(this.date.getMonth() + 1);
    this.day = this.setDigit(this.date.getDate());
    this.hour = this.setDigit(this.date.getHours());
    this.minute = this.setDigit(this.date.getMinutes());
    this.second = this.setDigit(this.date.getSeconds());
    this.millisecond = this.setDigit(this.date.getMilliseconds());

    this.currentTime = `${this.year}-${this.month}-${this.day} ${this.hour}:${this.minute}:${
      this.second
    }:${this.millisecond.slice(0, 2)}`;

    return this.currentTime;
  }
}

module.exports.timer = new Timer();

module.exports.redisSession = () => {};
export default {};
