import React from "react";
import Sorter from "./Sorter/Sorter";
import "./App.css";
import { Container } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { teal, lime } from "@material-ui/core/colors";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: lime,
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='xl' className='App'>
                <h1>Visual Sorting Algorithms</h1>
                <Sorter />
                <footer>
                    <a href='https://www.linkedin.com/in/zqlimy/'>
                        <LinkedIn />
                    </a>{" "}
                    <a href='https://github.com/zqlimy17/'>
                        <GitHubIcon />
                    </a>
                </footer>
            </Container>
        </ThemeProvider>
    );
}

export default App;
