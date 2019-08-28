import Chunk from "./chunk";
import { Vector3, Geometry, Face3, Mesh, Object3D, Material } from "three";
import Chunks from "./chunks";

export default class Mesher {
    static meshChunks(chunks: Chunks<number>, object: Object3D) {
        for (let id in chunks.map) {
            const chunk = chunks.map[id];
            if (!chunk.dirty) {
                continue;
            }
            const mesh = this.meshChunk(chunk, chunks.material);
            object.add(mesh);
            mesh.position.copy(chunk.origin);
            chunk.dirty = false;
        }
    }

    static meshChunk(chunk: Chunk<number>, material: Material) {
        const size = chunk.size;

        const mesh = new Mesh();

        const geometry = new Geometry();

        for (let d = 0; d < 3; d++) {
            for (let i = 0; i < size - 1; i++) {
                for (let j = 0; j < size; j++) {
                    for (let k = 0; k < size; k++) {
                        const a = this.getValue(chunk, i, j, k, d);
                        const b = this.getValue(chunk, i + 1, j, k, d);

                        if (a > 0 === b > 0) {
                            continue;
                        }

                        const flip = b > 0;

                        const v1 = this.getVector(i + 1, j, k, d);
                        const v2 = this.getVector(i + 1, j + 1, k, d);
                        const v3 = this.getVector(i + 1, j + 1, k + 1, d);
                        const v4 = this.getVector(i + 1, j, k + 1, d);

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

        geometry.computeFaceNormals();

        mesh.geometry = geometry;
        mesh.material = material;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    private static getVector(i: number, j: number, k: number, d: number) {
        if (d == 0) {
            return new Vector3(i, j, k);
        }

        if (d == 1) {
            return new Vector3(k, i, j);
        }

        return new Vector3(j, k, i);
    }

    private static getValue(chunk: Chunk<number>, i: number, j: number, k: number, d: number) {
        if (d == 0) {
            return chunk.get(i, j, k);
        }

        if (d == 1) {
            return chunk.get(k, i, j);
        }

        return chunk.get(j, k, i);
    }
}