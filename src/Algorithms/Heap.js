import { swap } from "./Helpers/Swap";

export function heapSortAnimation(array) {
    const animate = [];
    let n = array.length;

    // building max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animate);
    }

    for (let i = n - 1; i > 0; i--) {
        animate.push([2, i, 0]);
        swap(array, i, 0, animate);
        heapify(array, i, 0, animate);
    }

    animate.push([4, 0, 0]);
    return animate;
}

function heapify(array, n, i, animate) {
    animate.push([0, n - 1, i]);
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && array[i] < array[left]) {
        largest = left;
    }
    if (right < n && array[largest] < array[right]) {
        largest = right;
    }
    if (largest !== i) {
        animate.push([2, i, largest]);
        swap(array, i, largest);
        animate.push([3, i, largest]);
        heapify(array, n, largest, animate);
    }
    animate.push([1, n - 1, i]);
}
