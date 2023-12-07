// DogGrid.tsx
import React from 'react';
import {Grid, Paper} from '@mui/material';

interface IProps {
    gridData: any
}

const DogsGrid: React.FC<IProps> = ({gridData}) => {
    // Use gridData.current to assign the value
    return (
        <Grid item xs={9}>
            <div style={{height: 400, width: '100%'}}>
                <Grid container spacing={1}>
                    {gridData.map((row: any[], rowIndex: React.Key | null | undefined) => (
                        <Grid container item key={rowIndex} justifyContent="center" alignItems="center">
                            {row.map((cell, cellIndex) => (
                                <Grid item key={cellIndex}>
                                    <Paper style={{padding: 10}}>{cell.content}</Paper>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Grid>

    );
};

export default DogsGrid;


