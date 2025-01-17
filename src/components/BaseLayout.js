import React, { useState, useEffect } from 'react';
import Style from './BaseLayout.module.scss'
import Navbar from "./Navbar";
import Home from "./home/Home";
import About from "./about/About";
import Portfolio from "./portfolio/Portfolio";
import {Route, Routes} from "react-router-dom";
import {Box, Grid} from "@mui/material";

export default function BaseLayout() {
    const [info, setInfo] = useState({});

    useEffect(() => {
        fetch(
            "https://appservice23455.azurewebsites.net/portofolio?firstname=ledion1"
        )
            .then((res) => res.json())
            .then((result) => {
                setInfo(result);
            });
    }, []);

   let [darkMode, setDarkMode] = useState(false);

   function handleClick() {
      setDarkMode(!darkMode);
   }

   return (
      <Box className={darkMode ? Style.dark : Style.light}>
         <Grid container display={'flex'} flexDirection={'column'} minHeight={'100vh'}
               justifyContent={'space-between'}>
            <Grid item>
               <Navbar darkMode={darkMode} handleClick={handleClick}/>
            </Grid>
            <Grid item flexGrow={1}>
               <Routes>
                       <Route exact path={'/'} element={<Home {...info} />}/>
                       <Route exact path={'/about'} element={<About {...info} />}/>
                       <Route exact path={'/portfolio'} element={<Portfolio {...info} />}/>
               </Routes>
            </Grid>
            <Grid item>
               <Box component={'footer'} display={'flex'} flexDirection={'column'} alignItems={'center'}
                    py={'1.5rem'} sx={{opacity: 0.4}} width={'100%'}>
                  <p>template created with &hearts; by <a href={'https://paytonpierce.dev'}>Payton Pierce</a></p>
                  <p>&copy; 2022</p>
               </Box>
            </Grid>
         </Grid>
      </Box>
   )
}

