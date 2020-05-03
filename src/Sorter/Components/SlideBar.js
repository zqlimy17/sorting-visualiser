import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
    },

    child: {
        margin: "0 20px",
        flex: 1,
    },
});

const SlideBar = ({ arrSize, setArrSize, speed, setSpeed, sorting }) => {
    const classes = useStyles();
    const handleSize = (event, newValue) => {
        setArrSize(newValue);
        window.localStorage.setItem("size", arrSize);
    };

    const handleSpeed = (event, newValue) => {
        setSpeed(newValue);
        window.localStorage.setItem("speed", speed);
    };

    return (
        <div className={classes.root}>
            <Typography>Range Size: </Typography>
            <Slider
                disabled={sorting}
                className={classes.child}
                value={arrSize}
                onChange={handleSize}
                defaultValue={50}
                step={2}
                min={4}
                max={300}
                valueLabelDisplay='on'
            />
            <Typography>Speed (miliseconds): </Typography>
            <Slider
                disabled={sorting}
                className={classes.child}
                value={speed}
                onChange={handleSpeed}
                defaultValue={3}
                step={0.5}
                min={0.5}
                max={100}
                valueLabelDisplay='on'
            />
        </div>
    );
};

export default SlideBar;
