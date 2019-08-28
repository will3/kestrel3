import Component from "../core/component";
import { Camera, Euler, Vector3 } from "three";
import { injectable, inject, registry } from "tsyringe";

@injectable()
export default class CameraController extends Component {
    private camera: Camera;

    distance = 200;
    rotation = new Euler(Math.PI / 4, Math.PI / 4, 0, "YXZ");
    target = new Vector3();

    constructor(@inject(Camera) camera: Camera) {
        super();
        this.camera = camera;
    }

    update() {   
        const position = new Vector3(0, 0, -1).applyEuler(this.rotation).multiplyScalar(this.distance).add(this.target);
        this.camera.position.copy(position);
        this.camera.lookAt(this.target);

        this.rotation.y += 0.005;
    }
}