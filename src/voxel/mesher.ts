import Chunk from "./chunk";
import { Vector3, Geometry, Face3, Mesh } from "three";

export default class Mesher {
    static mesh(chunk: Chunk<number>) {
        let u, v;
        const size = chunk.size;

        const mesh = new Mesh();

        const geometry = new Geometry();

        for (let d = 0; d < 3; d++) {
            u = (d + 1) % 3;
            v = (d + 2) % 3;

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    for (let k = 0; k < size; k++) {
                        const a = chunk.get(i, j, k);
                        const b = chunk.get(i + 1, j, k);

                        if (a > 0 === b > 0) {
                            continue;
                        }

                        const flip = a > 0;

                        const v1 = this.getVector(i, j, k, d);
                        const v2 = this.getVector(i + 1, j, k, d);
                        const v3 = this.getVector(i + 1, j + 1, k, d);
                        const v4 = this.getVector(i, j + 1, k, d);

                        const index = geometry.vertices.length;
                        geometry.vertices.push(v1, v2, v3, v4);

                        if (flip) {
                            geometry.faces.push(new Face3(index + 2, index + 1, index));
                            geometry.faces.push(new Face3(index, index + 3, index + 2));
                        } else {
                            geometry.faces.push(new Face3(index, index + 1, index + 2));
                            geometry.faces.push(new Face3(index + 2, index + 3, index));
                        }
                    }
                }
            }
        }

        mesh.geometry = geometry;
        
        return mesh;
    }

    private static getVector(i: number, j: number, k: number, d: number) {
        if (d == 0) {
            return new Vector3(i, j, k);
        }

        if (d == 1) {
            return new Vector3(j, k, i);
        }

        return new Vector3(k, i, j);
    }
}