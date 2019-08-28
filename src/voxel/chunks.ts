import Chunk from "./chunk";
import { Vector3, MeshLambertMaterial } from "three";

export default class Chunks<T> {
    readonly map: { [key: string]: Chunk<T> } = {};
    private _size = 32;
    material = new MeshLambertMaterial({
        color: 0xffffff
    });

    get size() {
        return this._size;
    }

    get(i: number, j: number, k: number) {
        const origin = this.getOrigin(i, j, k);
        const chunk = this.getOrCreateChunk(origin);
        return chunk.get(i - origin.x, j - origin.y, k - origin.z);
    }

    set(i: number, j: number, k: number, v: T) {
        const origin = this.getOrigin(i, j, k);
        const chunk = this.getOrCreateChunk(origin);
        chunk.set(i - origin.x, j - origin.y, k - origin.z, v);
    }

    private getOrigin(i: number, j: number, k: number) {
        return new Vector3(
            Math.floor(i / this._size),
            Math.floor(j / this._size),
            Math.floor(k / this._size)).multiplyScalar(this._size);
    }

    private getOrCreateChunk(origin: Vector3) {
        var key = `${origin.x},${origin.y},${origin.z}`;

        var chunk = this.map[key];
        if (chunk != null) {
            return chunk;
        }

        chunk = new Chunk(this._size, origin);
        this.map[key] = chunk;
        return chunk;
    }
}