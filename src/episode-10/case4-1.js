function plumage(bird) {
  return new Bird(bird).plumage;
}
function speed(bird) {
  return new Bird(bird).airSpeedVelocity;
}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    switch (this.type) {
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

  get airSpeedVelocity() {
    switch (this.type) {
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
}
