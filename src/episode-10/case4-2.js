// 計算ポイントによって A / B を付与
function rating(voyage, history) {
  return createRating(voyage, history).value;
}

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > vr + chr * 2) return "A";
    else return "B";
  }

  // リスクのポイントを計算
  get voyageRisk() {
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (["china", "east-indies"].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  // リスクのポイントを計算
  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    return Math.max(result, 0);
  }

  // 潜在的利益のポイントを計算
  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "china") result += 1;
    if (this.voyage.zone === "east-indies") result += 1;
    result += this.voyageAndHistoryLengthFactor;
    return result;
  }

  get voyageAndHistoryLengthFactor() {
    let result = 0;
    if (this.voyage.zone === "china" && this.hasChinaHistory) {
      result += 3;
      if (this.history.length > 10) result += 1;
      if (this.history.length > 12) result += 1;
      if (this.history.length > 18) result -= 1;
    } else {
      if (this.history.length > 8) result += 1;
      if (this.history.length > 14) result -= 1;
    }
    return result;
  }

  get hasChina() {
    return this.history.some((v) => "china" === v.zone);
  }
}

// バリエーションの振る舞いを格納するために、からのサブクラスを作成
class ExperiencedChinaRating extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }
}

// 必要な時にバリエーションを持ったインスタンスを返すファクトリ関数を作成
function createRating(voyage, history) {
  if (voyage.zone === "china" && history.some((v) => "china" === v.zone))
    return new ExperiencedChinaRating(voyage, history);
  else return new Rating(voyage, history);
}

// ** 呼び出し側のコード **
const voyage = { zone: "west-indies", length: 10 };
const history = [
  { zone: "east-indies", profit: 5 },
  { zone: "west-indies", profit: 15 },
  { zone: "china", profit: -2 },
  { zone: "west-africa", profit: 7 },
];

const myRating = rating(voyage, history);
