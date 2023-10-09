// バリエーションに対してポリモーフィズムを適用する

// 格付け機関 が 船の航行に対する投資格付け を計算するために使用するコード
// 格付け機関 は 潜在的なリスク と 利益に影響するさまざまな要素 を考慮して、A または B のいずれかを付与する。
// リスク評価では、航海の性質だけでなく、船長の過去の航海実績 も考慮する。

// 計算ポイントによって A / B を付与
function rating(voyage, history) {
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);
  if (vpf * 3 > vr + chr * 2) return "A";
  else return "B";
}

// リスクのポイントを計算
function voyageRisk(voyage) {
  let result = 1;
  if (voyage.length > 4) result += 2;
  if (voyage.length > 8) result += voyage.length - 8;
  if (["china", "east-indies"].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}

// リスクのポイントを計算
function captainHistoryRisk(voyage, history) {
  let result = 1;
  if (voyage.length < 5) result += 4;
  result += history.filter((v) => v.profit < 0).length;
  if (voyage.zone === "china" && hasChina(history)) result -= 2;
  return Math.max(result, 0);
}

// 中国への航海経験を処理
function hasChina(history) {
  return history.some((v) => "china" === v.zone);
}

// 潜在的利益のポイントを計算
function voyageProfitFactor(voyage, history) {
  let result = 2;
  if (voyage.zone === "china") result += 1;
  if (voyage.zone === "east-indies") result += 1;
  if (voyage.zone === "china" && hasChina(history)) {
    result += 3;
    if (history.length > 10) result += 1;
    if (history.length > 12) result += 1;
    if (history.length > 18) result -= 1;
  } else {
    if (history.length > 8) result += 1;
    if (history.length > 14) result -= 1;
  }
  return result;
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
