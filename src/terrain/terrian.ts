import Chunks from "../voxel/chunks";
import { Vector3 } from "three";
import Noise3D from "../noise3D";

export default class Terrian {
    ground = new Chunks<number>();

    generate(origin: Vector3) {
        const noise = new Noise3D("1337");

        const size = this.ground.size;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                for (let k = 0; k < size; k++) {
                    const v = noise.getValue(i, j, k);
                    this.ground.set(
                        i + origin.x,
                        j + origin.y,
                        k + origin.z,
                        v);
                }
            }
        }
    }
};