
export const area = (r: number) => Math.PI * r * r;

export interface Circle {
    radius(): number;
    area(): number;
}