import { getObstacleEvents } from './computer-vision';
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
  steeringControl: Steering;
}

class Car implements AutonomousCar {
  isRunning;
  steeringControl;
  constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
  }

  respond(events: Events) {
    if (!this.isRunning) {
      console.log('The car is off.');
    }
    let eventKeys = Object.keys(events);
    eventKeys.forEach((eventKey) => {
      if (!events[eventKey]) return;

      if (eventKey === 'ObstacleLeft') {
        this.steeringControl.turn('right');
      }

      if (eventKey === 'ObstacleRight') {
        this.steeringControl.turn('left');
      }
    });
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

const steering = new SteeringControl();

const autonomousCar = new Car({
  isRunning: true,
  steeringControl: steering,
});

console.log(autonomousCar.respond(getObstacleEvents()));

/* 
    Write code that will call .respond() many times with new events to see a sequence of turns.
    Write code that allows the car to accelerate or decelerate based on the event. You could make this another type that extends the Control type.
    Add more types of events so your car can do things like ‘emergencyBrake’ or ‘parallelPark’.
 */
