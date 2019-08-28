import Component from "../core/component";
import { BoxGeometry, MeshNormalMaterial, Mesh } from "three";
import { injectable } from "tsyringe";

@injectable()
export default class TestCube extends Component {
    start() {
        const geometry = new BoxGeometry(0.5, 0.5, 0.5);
        const material = new MeshNormalMaterial();

        const mesh = new Mesh(geometry, material);

        this.object.add(mesh);
    }

    update() {
        this.object.rotation.x += 0.01;
        this.object.rotation.y += 0.03;
        this.object.rotation.z += 0.02;
    }
};