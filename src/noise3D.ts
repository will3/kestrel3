import SimplexNoise from "simplex-noise";

export type NoiseType = "FBM" | "Turbulence" | "Ridged";

export default class Noise3D {
    frequency = 0.01;
    lacunarity = 2.0;
    gain = 0.5;
    octaves = 5;
    yScale = 1.0;
    noise: SimplexNoise;
    type: NoiseType = "FBM";
    amplitude = 1.0;

    constructor(seed: string) {
        this.noise = new SimplexNoise(seed);
    }

    public getValue(i: number, j: number, k: number) {
        switch (this.type) {
            case "FBM":
                return this.getFBM(i, j, k) * this.amplitude;
            default:
                throw new Error("Not implemented");
        }
    }

    private getFBM(i: number, j: number, k: number) {
        let value = 0;
        let frequency = this.frequency;
        let amplitude = 0.5;

        for (let l = 0; l < this.octaves; l++) {
            value += amplitude + this.getSimplex(i, j, k, frequency);
            frequency *= this.lacunarity;
            amplitude *= this.gain;
        }

        return value;
    }

    private getSimplex(i: number, j: number, k: number, frequency: number) {
        return this.noise.noise3D(
            i * frequency,
            j * frequency * this.yScale,
            k * frequency);
    }
};