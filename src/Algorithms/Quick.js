import { swap } from "./Helpers/Swap";

export function quickSortAnimation(array) {
    const animate = [];
    quickSort(array, 0, array.length - 1, animate);
    animate.push([4, 0, 0]);
    return animate;
}

function quickSort(array, start, end, animate) {
    if (start >= end) return;
    let index = partition(array, start, end, animate);
    quickSort(array, start, index - 1, animate);
    quickSort(array, index + 1, end, animate);
}

function partition(array, start, end, animate) {
    let pivotIndex = start;
    let pivotValue = array[end];
    for (let i = start; i < end; i++) {
        animate.push([0, i, pivotIndex]);
        if (array[i] < pivotValue) {
            swap(array, i, pivotIndex);
            animate.push([2, i, pivotIndex]);
            animate.push([1, i, pivotIndex]);
            pivotIndex++;
        }
        animate.push([1, i, pivotIndex]);
    }
    swap(array, pivotIndex, end);
    animate.push([2, pivotIndex, end]);
    animate.push([1, pivotIndex, end]);
    return pivotIndex;
}
