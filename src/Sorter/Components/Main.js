import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        marginTop: 10,
        width: "100%",
        height: 400,
        display: "flex",
        justifyContent: "space-between",
    },
    bar: {
        margin: "0 1px",
        width: "100%",
    },
});

const Main = ({ arr }) => {
    const classes = useStyles();
    useEffect(() => {});

    return (
        <div className={classes.root}>
            {arr.map((item, index) => (
                <div
                    key={index}
                    id={index}
                    className={`${classes.bar} array-bar`}
                    style={{ height: `${item}px` }}
                />
            ))}
        </div>
    );
};

export default Main;
