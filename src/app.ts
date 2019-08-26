import "./app.css";
import Runner from './core/runner';
import TestCube from "./components/testCube";

const runner = new Runner();

runner.init();
runner.animate();

runner.addEntity().addComponent(new TestCube());