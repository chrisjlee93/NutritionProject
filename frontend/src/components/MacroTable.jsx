import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState} from "react";


// Separating the table component to help clean up code
export default function MacroTable({Macros, size}) {

    const calories = Number(Macros.nf_calories)
    const protein = Number(Macros.nf_protein)
    const carbs = Number(Macros.nf_total_carbohydrate)
    const fat = Number(Macros.nf_total_fat)
    const satFat = Number(Macros.nf_saturated_fat)
    const sugar = Number(Macros.nf_sugars)
    const sodium = Number(Macros.nf_sodium)

    const initalMacros = {
        calories,
        protein,
        carbs,
        fat,
        satFat,
        sugar,
        sodium
    }

    const [macros, setMacros] = useState(initalMacros)


    return (
        <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Macros</TableCell>
                        <TableCell align="right">Measurements</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Calories (kcal)</TableCell>
                        <TableCell align="right">{macros.calories*size}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Protein (g)</TableCell>
                        <TableCell align="right">{macros.protein*size}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Carbs (g)</TableCell>
                        <TableCell align="right">{macros.carbs*size}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Fat (g)</TableCell>
                        <TableCell align="right">{macros.fat*size}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Saturated Fat (g)</TableCell>
                        <TableCell align="right">{macros.satFat*size}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Sugar (g)</TableCell>
                        <TableCell align="right">{macros.sugar*size}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Sodium (g)</TableCell>
                        <TableCell align="right">{macros.sodium*size}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </>

    );
}
