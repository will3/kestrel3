export default class Chunk<T> {
    private data: T[] = [];
    private _size: number;

    get size() {
        return this._size;
    }

    constructor(size: number) {
        this._size = size;
    }

    get(i: number, j: number, k: number) {
        const index = this.getIndex(i, j, k);
        return this.data[index];
    }

    set(i: number, j: number, k: number, v: T) {
        const index = this.getIndex(i, j, k);
        this.data[index] = v;
    }

    private getIndex(i: number, j: number, k: number) {
        return i * this._size * this._size + j * this._size + k;
    }
}