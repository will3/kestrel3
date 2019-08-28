import { Vector3 } from "three";

export default class Chunk<T> {
    private data: T[] = [];
    readonly size: number;
    readonly origin: Vector3;
    dirty = false;

    constructor(size: number, origin: Vector3) {
        this.size = size;
        this.origin = origin;
    }

    get(i: number, j: number, k: number) {
        const index = this.getIndex(i, j, k);
        return this.data[index];
    }

    set(i: number, j: number, k: number, v: T) {
        const index = this.getIndex(i, j, k);
        this.data[index] = v;
        this.dirty = true;
    }

    private getIndex(i: number, j: number, k: number) {
        return i * this.size * this.size + j * this.size + k;
    }
}