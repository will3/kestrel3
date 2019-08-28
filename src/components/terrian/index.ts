import Component from "../../core/component";
import Chunks from "../../voxel/chunks";
import { Vector3 } from "three";
import Noise3D from "../../noise3D";
import Mesher from "../../voxel/mesher";
import { injectable } from "tsyringe";

@injectable()
export default class Terrian extends Component {
    private ground = new Chunks<number>();

    generateSize: Vector3 = new Vector3(4, 2, 4);

    maxHeight = 40;
    groundHeight = 12;
    heightIntensity = 1.0;

    noise: Noise3D;

    constructor() {
        super();

        this.noise = new Noise3D("1337");
        this.noise.frequency = 0.001;
        this.noise.octaves = 6;
        this.noise.amplitude = 0.5;
        this.noise.yScale = 0.4;
    }

    start() {
        this.generate();
        this.object.receiveShadow = true;
        this.object.castShadow = true;
    }

    update() {
        Mesher.meshChunks(this.ground, this.object);
    }

    private generate() {
        for (let i = 0; i < this.generateSize.x; i++) {
            for (let j = 0; j < this.generateSize.y; j++) {
                for (let k = 0; k < this.generateSize.z; k++) {
                    this.generateChunk(new Vector3(i, j, k).multiplyScalar(this.ground.size));
                }
            }
        }
    }

    private generateChunk(origin: Vector3) {
        const size = this.ground.size;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                for (let k = 0; k < size; k++) {
                    const height = (this.groundHeight - (origin.y + j)) / (this.maxHeight - this.groundHeight) * this.heightIntensity;

                    const v = this.noise.getValue(i + origin.x, j + origin.y, k + origin.z) + height;
                    this.ground.set(
                        i + origin.x,
                        j + origin.y,
                        k + origin.z,
                        v);
                }
            }
        }
    }
}