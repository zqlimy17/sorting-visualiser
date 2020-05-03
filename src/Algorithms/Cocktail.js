import { swap } from "./Helpers/Swap";
export function cocktailSortAnimation(array) {
    const animate = [];

    let n = array.length,
        swapped = true,
        start = 0,
        end = n - 1;

    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            animate.push([0, i, i + 1]);
            if (array[i] > array[i + 1]) {
                animate.push([2, i, i + 1]);
                swap(array, i, i + 1);
                swapped = true;
            }
            animate.push([1, i, i + 1]);
            if (i === end - 1) {
                animate.push([3, 0, i + 1]);
            }
        }

        if (!swapped) break;
        swapped = false;
        end = end - 1;

        for (let i = end - 1; i >= start; i--) {
            animate.push([0, i, i + 1]);
            if (array[i] > array[i + 1]) {
                animate.push([2, i, i + 1]);
                swap(array, i, i + 1);
                swapped = true;
            }
            animate.push([1, i, i + 1]);
            if (i === start) {
                animate.push([5, i, 0]);
            }
        }
        start = start + 1;
    }
    // for (let i = 0; i < array.length; i++) {
    //     for (let j = 0; j < array.length - i - 1; j++) {
    //         animate.push([0, j, j + 1]);
    //         if (array[j] > array[j + 1]) {
    //             animate.push([2, j, j + 1]);
    //             swap(array, j, j + 1);
    //         }
    //         animate.push([1, j, j + 1]);
    //     }
    //     animate.push([3, 0, array.length - 1 - i]);
    // }
    animate.push([4, 0, 0]);

    return animate;
}
