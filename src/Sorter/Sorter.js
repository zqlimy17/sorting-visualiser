import React, { useState, useEffect, Fragment } from "react";
import SlideBar from "./Components/SlideBar";
import Main from "./Components/Main";
import Method from "./Components/Method";
import { Button, ButtonGroup } from "@material-ui/core";
import { mergeSortAnimation } from "../Algorithms/Merge";
import { quickSortAnimation } from "../Algorithms/Quick";
import { bubbleSortAnimation } from "../Algorithms/Bubble";
import { heapSortAnimation } from "../Algorithms/Heap";
import { cocktailSortAnimation } from "../Algorithms/Cocktail";
import { selectionSortAnimation } from "../Algorithms/Selection";
import { insertionSortAnimation } from "../Algorithms/Insertion";
import "./Sorter.css";

const WINDOW_HEIGHT = window.innerHeight;

const Sorter = () => {
    const [allMethods] = useState([
        "merge",
        "quick",
        "bubble",
        "heap",
        "cocktail",
        "selection",
        "insertion",
    ]);
    const [arr, setArr] = useState([]);
    const [method, setMethod] = useState(
        window.localStorage.getItem("method") || "quick"
    );

    // stats
    const [scans, setScans] = useState(0);
    const [swaps, setSwaps] = useState(0);
    const [time, setTime] = useState(0);

    // miscellaneous
    const [sorting, setSorting] = useState(false); // disables button click when sorting
    const [arrSize, setArrSize] = useState(
        parseInt(window.localStorage.getItem("size")) || 50
    );
    const [speed, setSpeed] = useState(
        parseFloat(window.localStorage.getItem("speed")) || 3
    ); // speed in milliseconds for the algorithm
    const [sorted, setSorted] = useState(false);
    const [rebuild, setRebuild] = useState(false);

    // initialising / building array
    useEffect(() => {
        const buildArr = () => {
            try {
                setArr([]);
                setSorted(false);
                for (let i = 0; i < arrSize; i++) {
                    let val = Math.floor(
                        ((Math.random() + 0.01) * WINDOW_HEIGHT * 7.5) / 10
                    );
                    setArr((arr) => [...arr, val]);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        buildArr();
    }, [arrSize, rebuild]);

    // resetting array
    const reset = () => {
        try {
            setArrSize(50);
            setSpeed(3);
            setMethod("merge");
            window.localStorage.setItem("method", "merge");
            window.localStorage.setItem("size", arrSize);
            window.localStorage.setItem("speed", speed);
        } catch (error) {
            console.log(error.message);
        }
    };

    // runs one of the sorting methods when "execute" is clicked
    const execute = async () => {
        try {
            await setTime(0);
            await setScans(0);
            await setSwaps(0);
            await setSorting(true);
            switch (method) {
                case "merge":
                    await mergeSort();
                    break;
                case "quick":
                    await quickSort();
                    break;
                case "bubble":
                    await bubbleSort();
                    break;
                case "heap":
                    await heapSort();
                    break;
                case "cocktail":
                    await cocktailSort();
                    break;
                case "selection":
                    await selectionSort();
                    break;
                case "insertion":
                    await insertionSort();
                    break;
                default:
                    console.log(`Error`);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // sorting methods
    const mergeSort = () => {
        try {
            const animation = mergeSortAnimation(arr);
            let tempScans = 0;
            let tempSwaps = 0;

            for (let i = 0; i < animation.length; i++) {
                const arrayBars = document.getElementsByClassName("array-bar");
                const [type] = animation[i];
                if (type === 0) {
                    const barOneStyle = arrayBars[animation[i][1]].style;
                    const barTwoStyle = arrayBars[animation[i][2]].style;
                    tempScans++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "white";
                        barTwoStyle.backgroundColor = "white";
                    }, i * speed);
                } else if (type === 1) {
                    setTimeout(() => {
                        const barOneStyle = arrayBars[animation[i][1]].style;
                        const barTwoStyle = arrayBars[animation[i][2]].style;
                        barOneStyle.backgroundColor = "cadetblue";
                        barTwoStyle.backgroundColor = "cadetblue";
                    }, i * speed);
                } else if (type === 2) {
                    tempSwaps++;
                    setTimeout(() => {
                        const barOneStyle = arrayBars[animation[i][1]].style;
                        barOneStyle.backgroundColor = "red";
                        barOneStyle.height = `${animation[i][2]}px`;
                    }, i * speed);
                    setTimeout(() => {
                        const barOneStyle = arrayBars[animation[i][1]].style;
                        barOneStyle.backgroundColor = "cadetblue";
                    }, i * speed + speed);
                } else if (type === 4) {
                    for (let j = 0; j < arrayBars.length; j++) {
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "lime";
                        }, i * speed);
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "cadetblue";
                        }, i * speed + 1500);
                    }
                }
            }
            setTimeout(() => {
                setSorted(true);
                setScans(tempScans);
                setSwaps(tempSwaps);
                setTime(tempScans * speed);
                setSorting(false);
            }, animation.length * speed);
        } catch (error) {
            console.log(error.message);
        }
    };

    const quickSort = () => {
        try {
            const animation = quickSortAnimation(arr);
            let tempScans = 0;
            let tempSwaps = 0;
            for (let i = 0; i < animation.length; i++) {
                const arrayBars = document.getElementsByClassName("array-bar");
                const [type, barOneIdx, barTwoIdx] = animation[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                if (type === 0) {
                    tempScans++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "white";
                        barTwoStyle.backgroundColor = "white";
                    }, i * speed);
                } else if (type === 1) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "cadetblue";
                        barTwoStyle.backgroundColor = "cadetblue";
                    }, i * speed);
                } else if (type === 2) {
                    tempSwaps++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "cyan";
                        barTwoStyle.backgroundColor = "cyan";
                        let temp = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = temp;
                    }, i * speed);
                } else if (type === 4) {
                    for (let j = 0; j < arrayBars.length; j++) {
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "lime";
                        }, i * speed);
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "cadetblue";
                        }, i * speed + 1500);
                    }
                }
            }
            setTimeout(() => {
                setSorted(true);
                setScans(tempScans);
                setSwaps(tempSwaps);
                setTime(tempScans * speed);
                setSorting(false);
            }, animation.length * speed);
        } catch (error) {
            console.log(error.message);
        }
    };

    const bubbleSort = () => {
        try {
            const animation = bubbleSortAnimation(arr);
            let tempScans = 0;
            let tempSwaps = 0;
            for (let i = 0; i < animation.length; i++) {
                const arrayBars = document.getElementsByClassName("array-bar");
                const [type, barOneIdx, barTwoIdx] = animation[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                if (type === 0) {
                    tempScans++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "white";
                        barTwoStyle.backgroundColor = "white";
                    }, i * speed);
                } else if (type === 1) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "cadetblue";
                        barTwoStyle.backgroundColor = "cadetblue";
                    }, i * speed);
                } else if (type === 2) {
                    tempSwaps++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "red";
                        barTwoStyle.backgroundColor = "red";
                        let temp = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = temp;
                    }, i * speed);
                } else if (type === 3) {
                    setTimeout(() => {
                        barTwoStyle.backgroundColor = "cyan";
                    }, i * speed);
                } else if (type === 4) {
                    for (let j = 0; j < arrayBars.length; j++) {
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "lime";
                        }, i * speed);
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "cadetblue";
                        }, i * speed + 1500);
                    }
                }
            }
            setTimeout(() => {
                setSorted(true);
                setScans(tempScans);
                setSwaps(tempSwaps);
                setTime(tempScans * speed);
                setSorting(false);
            }, animation.length * speed);
        } catch (error) {
            console.log(error.message);
        }
    };

    const heapSort = () => {
        try {
            const animation = heapSortAnimation(arr);
            let tempScans = 0;
            let tempSwaps = 0;
            for (let i = 0; i < animation.length; i++) {
                const arrayBars = document.getElementsByClassName("array-bar");
                const [type, barOneIdx, barTwoIdx] = animation[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                if (type === 0) {
                    tempScans++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "white";
                        barTwoStyle.backgroundColor = "white";
                    }, i * speed);
                } else if (type === 1) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "cadetblue";
                        barTwoStyle.backgroundColor = "cadetblue";
                    }, i * speed);
                } else if (type === 2) {
                    tempSwaps++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "cyan";
                        barTwoStyle.backgroundColor = "red";
                        let temp = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = temp;
                    }, i * speed);
                } else if (type === 3) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "red";
                    }, i * speed);
                } else if (type === 4) {
                    for (let j = 0; j < arrayBars.length; j++) {
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "lime";
                        }, i * speed);
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "cadetblue";
                        }, i * speed + 1500);
                    }
                }
            }
            setTimeout(() => {
                setSorted(true);
                setScans(tempScans);
                setSwaps(tempSwaps);
                setTime(tempScans * speed);
                setSorting(false);
            }, animation.length * speed);
        } catch (error) {
            console.log(error.message);
        }
    };

    const cocktailSort = () => {
        try {
            const animation = cocktailSortAnimation(arr);
            let tempScans = 0;
            let tempSwaps = 0;
            for (let i = 0; i < animation.length; i++) {
                const arrayBars = document.getElementsByClassName("array-bar");
                const [type, barOneIdx, barTwoIdx] = animation[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                if (type === 0) {
                    tempScans++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "white";
                        barTwoStyle.backgroundColor = "white";
                    }, i * speed);
                } else if (type === 1) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "cadetblue";
                        barTwoStyle.backgroundColor = "cadetblue";
                    }, i * speed);
                } else if (type === 2) {
                    tempSwaps++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "red";
                        barTwoStyle.backgroundColor = "red";
                        let temp = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = temp;
                    }, i * speed);
                } else if (type === 3) {
                    setTimeout(() => {
                        barTwoStyle.backgroundColor = "cyan";
                    }, i * speed);
                } else if (type === 5) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "cyan";
                    }, i * speed);
                } else if (type === 4) {
                    for (let j = 0; j < arrayBars.length; j++) {
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "lime";
                        }, i * speed);
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "cadetblue";
                        }, i * speed + 1500);
                    }
                }
            }
            setTimeout(() => {
                setSorted(true);
                setScans(tempScans);
                setSwaps(tempSwaps);
                setTime(tempScans * speed);
                setSorting(false);
            }, animation.length * speed);
        } catch (error) {
            console.log(error.message);
        }
    };

    const selectionSort = () => {
        try {
            const animation = selectionSortAnimation(arr);
            let tempScans = 0;
            let tempSwaps = 0;
            for (let i = 0; i < animation.length; i++) {
                const arrayBars = document.getElementsByClassName("array-bar");
                const [type, barOneIdx, barTwoIdx] = animation[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                if (type === 0) {
                    tempScans++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "white";
                        barTwoStyle.backgroundColor = "red";
                    }, i * speed);
                } else if (type === 1) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "cadetblue";
                        barTwoStyle.backgroundColor = "cadetblue";
                    }, i * speed);
                } else if (type === 2) {
                    tempSwaps++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "red";
                        barTwoStyle.backgroundColor = "red";
                        let temp = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = temp;
                    }, i * speed);
                } else if (type === 3) {
                    setTimeout(() => {
                        barTwoStyle.backgroundColor = "cyan";
                    }, i * speed);
                } else if (type === 4) {
                    for (let j = 0; j < arrayBars.length; j++) {
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "lime";
                        }, i * speed);
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "cadetblue";
                        }, i * speed + 1500);
                    }
                }
            }
            setTimeout(() => {
                setSorted(true);
                setScans(tempScans);
                setSwaps(tempSwaps);
                setTime(tempScans * speed);
                setSorting(false);
            }, animation.length * speed);
        } catch (error) {
            console.log(error.message);
        }
    };

    const insertionSort = () => {
        try {
            let animation = insertionSortAnimation(arr);
            let tempScans = 0;
            let tempSwaps = 0;
            for (let i = 0; i < animation.length; i++) {
                const arrayBars = document.getElementsByClassName("array-bar");
                const [type, barOneIdx, barTwoIdx] = animation[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                if (type === 0) {
                    tempScans++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "white";
                        barTwoStyle.backgroundColor = "red";
                    }, i * speed);
                } else if (type === 1) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "cadetblue";
                        barTwoStyle.backgroundColor = "cadetblue";
                    }, i * speed);
                } else if (type === 2) {
                    tempSwaps++;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = "red";
                        // barTwoStyle.backgroundColor = "red";
                        let temp = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = temp;
                    }, i * speed);
                } else if (type === 3) {
                    setTimeout(() => {
                        barTwoStyle.backgroundColor = "cyan";
                        barOneStyle.backgroundColor = "cyan";
                    }, i * speed);
                } else if (type === 4) {
                    for (let j = 0; j < arrayBars.length; j++) {
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "lime";
                        }, i * speed);
                        setTimeout(() => {
                            arrayBars[j].style.backgroundColor = "cadetblue";
                        }, i * speed + 1500);
                    }
                }
            }
            setTimeout(() => {
                setSorted(true);
                setScans(tempScans);
                setSwaps(tempSwaps);
                setTime(tempScans * speed);
                setSorting(false);
            }, animation.length * speed);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <SlideBar
                arrSize={arrSize}
                setArrSize={setArrSize}
                sorting={sorting}
                speed={speed}
                setSpeed={setSpeed}
            />
            <Method
                method={method}
                setMethod={setMethod}
                execute={execute}
                sorting={sorting}
                sorted={sorted}
                allMethods={allMethods}
            />
            <ButtonGroup>
                <Button
                    style={{ marginLeft: "20px" }}
                    variant='contained'
                    onClick={() => setRebuild(!rebuild)}
                    disabled={sorting}
                    color={sorted ? "secondary" : "primary"}
                >
                    New Range
                </Button>
                <Button
                    variant='contained'
                    onClick={() => {
                        window.location.reload();
                    }}
                    color='primary'
                >
                    Clear
                </Button>
                <Button
                    variant='contained'
                    onClick={reset}
                    color='primary'
                    disabled={sorting}
                >
                    Reset
                </Button>
            </ButtonGroup>
            <div className='statsbar'>
                {scans ? (
                    <Fragment>
                        <span className='stats'>Total Scans: </span>
                        <span className='nstats'>{scans}</span>
                    </Fragment>
                ) : (
                    ""
                )}
                {swaps ? (
                    <Fragment>
                        <span className='stats'>Total Swaps: </span>
                        <span className='nstats'>{swaps}</span>
                    </Fragment>
                ) : (
                    ""
                )}
                {time ? (
                    <Fragment>
                        <span className='stats'>Time Taken: </span>
                        <span className='nstats'>{time.toFixed(2)}</span>
                        <span className='xstats'>ms</span>
                    </Fragment>
                ) : (
                    ""
                )}
            </div>

            <Main arr={arr} />
        </div>
    );
};

export default Sorter;
