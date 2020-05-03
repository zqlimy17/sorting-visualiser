import { swap } from "./Helpers/Swap";
export function selectionSortAnimation(array) {
    const animate = [];
    for (let j = 0; j < array.length - 1; j++) {
        let min = j;
        for (let i = j + 1; i < array.length; i++) {
            animate.push([0, i, min]);
            animate.push([1, i, min]);
            if (array[i] <= array[min]) min = i;
        }
        if (min !== j) {
            animate.push([2, min, j]);
            animate.push([3, min, j]);
            swap(array, min, j);
        } else {
            animate.push([3, min, j]);
        }
    }
    animate.push([4, 0, 0]);
    return animate;
}
