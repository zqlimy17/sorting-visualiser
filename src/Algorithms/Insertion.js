export function insertionSortAnimation(array) {
    let animate = [];

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        animate.push([0, j, i]);
        animate.push([3, j, i]);
        while (j >= 0 && key < array[j]) {
            animate.push([2, j, j + 1]);
            animate.push([3, j, j + 1]);
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key;
    }
    animate.push([4, 0, 0]);
    return animate;
}
