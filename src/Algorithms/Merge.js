// export function mergeSort(array) {
//     if (array.length === 1) return array;
//     const middleIndex = Math.floor(array.length / 2);
//     const firstHalf = mergeSort(array.slice(0, middleIndex));
//     const secondHalf = mergeSort(array.slice(middleIndex));
//     const sortedArray = [];
//     let i = 0,
//         j = 0;
//     while (i < firstHalf.length && j < secondHalf.length) {
//         if (firstHalf[i] < secondHalf[j]) {
//             sortedArray.push(firstHalf[i++]);
//         } else {
//             sortedArray.push(secondHalf[j++]);
//         }
//     }
//     while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
//     while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
//     return sortedArray;
// }

export function mergeSortAnimation(array) {
    const animate = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animate);
    animate.push([4, 0, 0]);
    return animate;
}

function mergeSortHelper(
    mainArray,
    startIndex,
    endIndex,
    auxiliaryArray,
    animate
) {
    if (startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(
        auxiliaryArray,
        startIndex,
        middleIndex,
        mainArray,
        animate
    );
    mergeSortHelper(
        auxiliaryArray,
        middleIndex + 1,
        endIndex,
        mainArray,
        animate
    );
    doMerge(
        mainArray,
        startIndex,
        middleIndex,
        endIndex,
        auxiliaryArray,
        animate
    );
}

function doMerge(
    mainArray,
    startIndex,
    middleIndex,
    endIndex,
    auxiliaryArray,
    animate
) {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;
    while (i <= middleIndex && j <= endIndex) {
        animate.push([0, i, j]);
        animate.push([1, i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animate.push([2, k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animate.push([2, k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIndex) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animate.push([0, i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animate.push([1, i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animate.push([2, k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIndex) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animate.push([0, j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animate.push([1, j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animate.push([2, k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

// export function mergeSortAnimation(array) {
//     const aux = new Array(...array);
//     console.log(aux);
//     const animate = [];

//     mergeSort(array, aux, animate);

//     animate.push([4, 0, 0]);
//     return animate;
// }

// function mergeSort(array, aux, animate) {
//     let n = array.length;
//     if (n === 1) return array;

//     let arrayOne = array.slice(0, Math.floor(n / 2));
//     let arrayTwo = array.slice(Math.floor(n / 2), n);

//     arrayOne = mergeSort(arrayOne, aux, animate);
//     arrayTwo = mergeSort(arrayTwo, aux, animate);

//     return merge(arrayOne, arrayTwo, aux, animate);
// }

// function merge(a, b, aux, animate) {
//     let c = [];

//     while (a.length > 0 && b.length > 0) {
//         animate.push([0, aux.indexOf(a[0]), aux.indexOf(b[0])]);
//         animate.push([1, aux.indexOf(a[0]), aux.indexOf(b[0])]);
//         if (a[0] > b[0]) {
//             animate.push([2, aux.indexOf(b[0]), 0]);
//             c.push(b.shift());
//         } else {
//             animate.push([2, aux.indexOf(a[0]), 0]);

//             c.push(a.shift());
//         }
//     }
//     while (a.length > 0) {
//         animate.push([2, aux.indexOf(a[0]), 0]);
//         c.push(a.shift());
//     }
//     while (b.length > 0) {
//         animate.push([2, aux.indexOf(b[0]), 0]);
//         c.push(b.shift());
//     }
//     return c;
// }
