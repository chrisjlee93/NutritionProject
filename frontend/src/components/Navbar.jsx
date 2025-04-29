import * as React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1  }}>
                        <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none' }}>
                            Home
                        </Link>
                        <Link to="/mealDB" style={{ marginRight: '1rem', textDecoration: 'none' }}>
                            Search by Ingredient
                        </Link>
                        <Link to="/spoon" style={{ marginRight: '1rem', textDecoration: 'none' }}>
                            Spoon
                        </Link>
                    </Typography>
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
