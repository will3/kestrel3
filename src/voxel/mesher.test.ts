import Chunk from "./chunk";
import { Vector3, Material, Geometry } from "three";
import Mesher from "./mesher";

describe('Mesher', () => {
    it('Meshes a cube', () => {
        const chunk = new Chunk<number>(32, new Vector3());
        chunk.set(1, 1, 1, 1);

        const mesh = Mesher.meshChunk(chunk, new Material());
        const geometry = mesh.geometry as Geometry;

        expect(geometry.faces).toHaveLength(12);
    });
});