import Chunks from "./chunks";

describe('Chunks', () => {
    it('sets data', () => {
        const chunks = new Chunks<number>();
        chunks.set(1, 2, 3, 4);

        const value = chunks.get(1, 2, 3);
        expect(value).toBe(4);
    });
})