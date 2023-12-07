// dogsSlice.ts
import {createSlice} from '@reduxjs/toolkit';

export interface DogBreed {
    [key: string]: any;

    breed: string
    count: number
    imageUrls: string[];
    likes: number;
}

interface DogsState {
    dogs: { [key: string]: DogBreed };
}

const initialState: DogsState = {
    dogs: {},
};

const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {
        updateLikes: (state, action) => {
            if (state.dogs[action.payload]) {
                state.dogs[action.payload].likes += 1;
            }
        },
        setDogs(state, action) {
            state.dogs = action.payload;
        }
    },
});

export const {updateLikes, setDogs} = dogsSlice.actions;
export default dogsSlice.reducer;
