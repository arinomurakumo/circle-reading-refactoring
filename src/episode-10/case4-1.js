function plumage(bird) {
  return createBird(bird).plumage;
}
function speed(bird) {
  return createBird(bird).airSpeedVelocity;
}

function createBird(bird) {
  switch (bird.type) {
    case "EuropeanSwallow":
      return new EuropeanSwallow(bird);
    case "AfricanSwallow":
      return new AfricanSwallow(bird);
    case "NorwegianBlueParrot":
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return "avarage";
  }
}
class AfricanSwallow extends Bird {}
class NorwegianBlueParrot extends Bird {}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    switch (this.type) {
      case "EuropeanSwallow":
        throw "oops";
      case "AfricanSwallow":
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
      case "AfricanSwallow":
        return 40 - 2 * bird.numberOfCoconuts;
      case "NorwegianBlueParrot":
        return bird.isNailed ? 0 : 10 + bird.voltage / 10;
      default:
        return null;
    }
  }
}
