import "reflect-metadata";

import "./app.css";
import Runner from './core/runner';
import Terrian from "./components/terrian";
import CameraController from "./components/cameraController";
import { container } from "tsyringe";
import { Camera, DirectionalLight, AmbientLight, Scene } from "three";

const runner = new Runner();

container.register(Camera, {
    useValue: runner.renderer.camera
});

container.register(Scene, {
    useValue: runner.renderer.scene
});

runner.animate();

// runner.addEntity().addComponent(TestCube);
runner.addEntity().addComponent(Terrian);
runner.addEntity().addComponent(CameraController);

const directionalLight = new DirectionalLight(0xffffff, 0.2);
directionalLight.position.set(0.5, 1.0, -0.3);
directionalLight.position.setLength(200);

directionalLight.castShadow = true;

directionalLight.shadowMapWidth = directionalLight.shadowMapHeight = 512;
const d = 200;
directionalLight.shadowCameraLeft = -d;
directionalLight.shadowCameraRight = d;
directionalLight.shadowCameraTop = d;
directionalLight.shadowCameraBottom = -d;
directionalLight.shadowCameraFar = 1000;
directionalLight.shadowBias = 0.00000001;
directionalLight.shadow.radius = 0.0;

const ambientLight = new AmbientLight(0x333333);

const directionalLight2 = new DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(0.5, 1.0, -0.3);

runner.renderer.scene.add(directionalLight);
runner.renderer.scene.add(directionalLight2);
runner.renderer.scene.add(ambientLight);