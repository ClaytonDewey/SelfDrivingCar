import { getObstacleEvents } from './computer-vision';
// https://www.codecademy.com/learn/learn-typescript
interface AutonomousCar {
  isRunning: boolean;
  respond: (events: Events) => void;
}

interface Events {
  [obstacle: string]: boolean;
}

interface Control {
  execute: (command: string) => void;
}

interface Steering extends Control {
  turn: (direction: string) => void;
}

interface AutonomousCarProps {
  isRunning: boolean;
}

class Car implements AutonomousCar {
  isRunning;
  constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning;
  }

  respond(events: Events) {
    if (!this.isRunning) {
      console.log('The car is off.');
    }
  }
}

class SteeringControl implements Steering {
  execute(command: string) {
    console.log(`Executing: ${command}`);
  }

  turn(direction: string) {
    this.execute(`turn ${direction}`);
  }
}

const autonomousCar = new Car({
  isRunning: true,
});

const steering = new SteeringControl();
steering.turn('right');

console.log(autonomousCar.respond(getObstacleEvents()));
