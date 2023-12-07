import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, Paper} from '@mui/material';
import {IRootState} from "../state/reducers";

const DataPanel: React.FC = () => {
    const dogs = useSelector((state: IRootState) => state.dog.dogs);

    return (
        <Grid item xs={3}>
            <Paper style={{padding: 20}}>
                <h2>Dog Breeds</h2>
                {dogs &&
                    Object.values(dogs).map((dog) => (
                        <div key={dog.breed}>
                            <p>{`Breed: ${dog.breed}: Count:${dog.count} likes: ${dog.likes}`}</p>
                        </div>
                    ))}
            </Paper>
        </Grid>
    );
};

export default DataPanel;


