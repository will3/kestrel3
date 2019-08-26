import Chunk from "./chunk";

export default class Chunks<T> {
    private map: { [key: string]: Chunk<T> } = {};
    private _size = 32;

    get size() {
        return this._size;
    }

    get(i: number, j: number, k: number) {
        const origin = this.getOrigin(i, j, k);
        const chunk = this.getOrCreateChunk(origin);
        return chunk.get(i - origin[0], j - origin[1], k - origin[2]);
    }

    set(i: number, j: number, k: number, v: T) {
        const origin = this.getOrigin(i, j, k);
        const chunk = this.getOrCreateChunk(origin);
        chunk.set(i - origin[0], j - origin[1], k - origin[2], v);
    }

    private getOrigin(i: number, j: number, k: number) {
        return [
            Math.floor(i / this._size),
            Math.floor(j / this._size),
            Math.floor(k / this._size)
        ];
    }

    private getOrCreateChunk(origin: number[]) {
        var key = `${origin[0]},${origin[1]},${origin[2]}`;

        var chunk = this.map[key];
        if (chunk != null) {
            return chunk;
        }

        chunk = new Chunk(this._size);
        this.map[key] = chunk;
        return chunk;
    }
}