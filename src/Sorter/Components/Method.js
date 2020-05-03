import React, { Fragment } from "react";
import { Button, ButtonGroup } from "@material-ui/core";

const Method = ({
    allMethods,
    method,
    setMethod,
    execute,
    sorting,
    sorted,
}) => {
    return (
        <Fragment>
            <ButtonGroup>
                {allMethods.map((m, index) => (
                    <Button
                        key={index}
                        variant={method === m ? "contained" : "outlined"}
                        onClick={() => {
                            setMethod(m);
                            window.localStorage.setItem("method", m);
                        }}
                        color='primary'
                        disabled={sorting}
                    >
                        {m}
                    </Button>
                ))}

                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                        execute();
                    }}
                    disabled={sorting || sorted}
                >
                    Execute {method} Sort!
                </Button>
            </ButtonGroup>
        </Fragment>
    );
};

export default Method;
