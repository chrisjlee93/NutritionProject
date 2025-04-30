import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function MacroTable({Macros}) {
    return (
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
                        <TableCell align="right">{Macros.nf_calories}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Protein (g)</TableCell>
                        <TableCell align="right">{Macros.nf_protein}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Carbs (g)</TableCell>
                        <TableCell align="right">{Macros.nf_total_carbohydrate}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Fat (g)</TableCell>
                        <TableCell align="right">{Macros.nf_total_fat}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Saturated Fat (g)</TableCell>
                        <TableCell align="right">{Macros.nf_saturated_fat}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Sugar (g)</TableCell>
                        <TableCell align="right">{Macros.nf_sugars}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Sodium (g)</TableCell>
                        <TableCell align="right">{Macros.nf_sodium}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
