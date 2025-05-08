import * as React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import {Drawer, List, ListItem} from "@mui/material";

export default function NavBar() {

    const [visible, setVisible] = useState(false)

    const toggleDrawer = (state) => {
        setVisible(state)
    }

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
                        onClick={() => toggleDrawer(true)}
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
                    </Typography>
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={visible} onClose={() => toggleDrawer(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => toggleDrawer(false)}
                    onKeyDown={() => toggleDrawer(false)}
                >
                    <List>
                        <ListItem>
                            <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none' }}>
                                Home
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/mealDB" style={{ marginRight: '1rem', textDecoration: 'none' }}>
                                Search by Ingredient
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/favorites" style={{ marginRight: '1rem', textDecoration: 'none' }}>
                                Favorites
                            </Link>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>

    );
}
