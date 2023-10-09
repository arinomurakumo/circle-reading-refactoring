// 鳥の情報を判定する小さなプログラム
function plumages(birds) {
  return new Map(birds.map(b >= [b.name, plumage(b)]));
}
function speeds(birds) {
  return new Map(birds.map(b >= [b.name, airSpeedVelocity(b)]));
}

function plumage(bird) {
  switch (bird.type) {
    case "EuropeanSwallow":
      return "avarage";
    case "AfircanSwallow":
      return bird.numberOfCoconuts > 2 ? "tired" : "avarage";
    case "NorwegianBlueParrot":
      return bird.voltage > 100 ? "scorched" : "beautiful";
    default:
      return "unknown";
  }
}

function airSpeedVelocity(bird) {
  switch (bird.type) {
    case "EuropeanSwallow":
      return 35;
    case "AfircanSwallow":
      return 40 - 2 * bird.numberOfCoconuts;
    case "NorwegianBlueParrot":
      return bird.isNailed ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }
}
