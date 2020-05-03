import { swap } from "./Helpers/Swap";

export function bubbleSortAnimation(array) {
    const animate = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            animate.push([0, j, j + 1]);
            if (array[j] > array[j + 1]) {
                animate.push([2, j, j + 1]);
                swap(array, j, j + 1);
            }
            animate.push([1, j, j + 1]);
        }
        animate.push([3, 0, array.length - 1 - i]);
    }
    animate.push([4, 0, 0]);

    return animate;
}
