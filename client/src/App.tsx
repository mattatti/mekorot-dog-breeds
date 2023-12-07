// App.tsx
import React from 'react';
import DogsGrid from './components/DogGrid.tsx';
import DataPanel from "./components/DataPanel.tsx";
import {Grid} from "@mui/material";

export const App: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <DataPanel/>
            <DogsGrid/>
        </Grid>
    );
};