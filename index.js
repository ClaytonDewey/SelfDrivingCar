"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computer_vision_1 = require("./computer-vision");
class Car {
    constructor(props) {
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
    }
    respond(events) {
        if (!this.isRunning) {
            console.log('The car is off.');
        }
        let eventKeys = Object.keys(events);
        eventKeys.forEach((eventKey) => {
            if (!events[eventKey])
                return;
            if (eventKey === 'ObstacleLeft') {
                this.steeringControl.turn('right');
            }
            if (eventKey === 'ObstacleRight') {
                this.steeringControl.turn('left');
            }
        });
    }
}
class SteeringControl {
    execute(command) {
        console.log(`Executing: ${command}`);
    }
    turn(direction) {
        this.execute(`turn ${direction}`);
    }
}
const steering = new SteeringControl();
const autonomousCar = new Car({
    isRunning: true,
    steeringControl: steering,
});
console.log(autonomousCar.respond((0, computer_vision_1.getObstacleEvents)()));
