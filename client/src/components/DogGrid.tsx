// DogGrid.tsx
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {Grid, Paper} from "@mui/material";
import {DogBreed, setDogs, updateLikes} from "../state/reducers/dog.ts";
import {IRootState} from "../state/reducers";

interface Cell {
    content: React.ReactNode;
}

interface DogApiResponse {
    message: Record<string, string[]>;
    status: string;
}

const DogGrid: React.FC = () => {
    const dispatch = useDispatch();
    const dogs = useSelector((state: IRootState) => state.dog.dogs);
    const [shuffledDogs, setShuffledDogs] = useState<any>(null);
    const [gridData, setGridData] = useState<Cell[][]>([]);

    const handleCellClick = (breed: string) => {
        dispatch(updateLikes(breed));
    };

    const mapStringsToDogBreeds = (breeds: string[]): { [key: string]: DogBreed } => {
        const dogBreeds: { [key: string]: DogBreed } = {};

        breeds.forEach(breed => {
            dogBreeds[breed] = {imageUrls: [], count: 0, likes: 0, breed: breed};
        });

        return dogBreeds;
    }

    const generateShuffledDogs = (dogsWithImages: { [key: string]: DogBreed }) => {
        const shuffledDogsArray = Object.values(dogsWithImages).flatMap(dog =>
            dog.imageUrls.map(imageUrl => ({breed: dog.breed, imageUrl}))
        );

        for (let i = shuffledDogsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDogsArray[i], shuffledDogsArray[j]] = [shuffledDogsArray[j], shuffledDogsArray[i]];
        }
        setShuffledDogs(shuffledDogsArray);
    };

    const generateData = (generatedShuffledDogs: { breed: string, imageUrl: string }[]) => {
        const data: Cell[][] = [];
        for (let rowIndex = 0; rowIndex < 20; rowIndex++) {
            const row: Cell[] = [];
            for (let cellIndex = 0; cellIndex < 5; cellIndex++) {
                const dog = generatedShuffledDogs[rowIndex * 5 + cellIndex];
                row.push({
                    content: (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 120,
                            height: 150,
                        }}
                             onClick={() => handleCellClick(dog.breed)}>
                            <div>{dog.breed}</div>
                            <div>likes: {dogs[dog.breed]?.likes || 0}</div>
                            <img
                                src={dog.imageUrl}
                                style={{maxWidth: '100px', maxHeight: '100px'}}
                                alt={dog.breed}
                                onError={(e) => {
                                    const imgElement = e.target as HTMLImageElement;
                                    imgElement.onerror = null;
                                    imgElement.style.display = 'none';

                                    const errorDiv = document.createElement('div');
                                    errorDiv.innerText = 'Image not found';
                                    errorDiv.style.border = '1px solid black';
                                    errorDiv.style.width = '90px';
                                    errorDiv.style.height = '60px';
                                    errorDiv.style.textAlign = 'center';
                                    errorDiv.style.paddingTop = '15px';
                                    imgElement.parentNode?.appendChild(errorDiv);
                                }}
                            />
                        </div>
                    ),
                });
            }
            data.push(row);
        }

        setGridData(data);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(dogs).length === 0) {
                try {
                    const listResponse = await axios.get<DogApiResponse>('https://dog.ceo/api/breeds/list/all');
                    const breeds = Object.keys(listResponse.data.message);
                    const dogBreeds = mapStringsToDogBreeds(breeds);

                    for (let i = 0; i < 100; i++) {
                        const randomIndex = Math.floor(Math.random() * breeds.length);
                        const randomBreed = breeds[randomIndex];

                        const breedResponse = await axios.get(`https://dog.ceo/api/breed/${randomBreed}/images/random`);
                        dogBreeds[randomBreed].imageUrls.push(breedResponse.data.message);
                        dogBreeds[randomBreed].count++;
                    }

                    const dogBreedsWithImages: { [key: string]: DogBreed } = {};

                    Object.keys(dogBreeds).forEach(breed => {
                        if (dogBreeds[breed].imageUrls.length > 0) {
                            dogBreedsWithImages[breed] = dogBreeds[breed];
                        }
                    });

                    generateShuffledDogs(dogBreedsWithImages);
                    dispatch(setDogs(dogBreedsWithImages));

                } catch
                    (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }

        fetchData().catch(console.error);
    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(dogs).length !== 0 && shuffledDogs) {
            generateData(shuffledDogs);
        }
    }, [dogs, shuffledDogs]);

    return (
        <Grid item xs={9}>
            <div style={{height: 400, width: '100%'}}>
                {gridData.length ? (
                    <Grid container spacing={2}>
                        {gridData.map((row, rowIndex) => (
                            <Grid spacing={2} container item key={rowIndex} justifyContent="center" alignItems="center">
                                {row.map((cell, cellIndex) => (
                                    <Grid item key={cellIndex}>
                                        <Paper style={{padding: 10}}>{cell.content}</Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <div>Loading dogs...</div>
                )}
            </div>
        </Grid>
    );
};

export default DogGrid;


