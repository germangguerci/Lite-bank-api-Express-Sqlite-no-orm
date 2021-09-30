export default class {
  static getUserInfoDates() {
    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);
    const todayIso = today.toISOString();
    const fiveDaysAgoIso = fiveDaysAgo.toISOString();
    return {
      today: todayIso.slice(0, 10),
      fiveDaysAgo: fiveDaysAgoIso.slice(0, 10),
    };
  }
}
