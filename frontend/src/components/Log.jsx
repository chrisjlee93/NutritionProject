import {useEffect, useState} from "react";
import {createLog, fetchLogs, fetchLogsByDate, fetchMacrosFromIngredients, fetchWater, patchWater} from "./service.js";
import LogList from "./LogList.jsx";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {BarChart} from "@mui/x-charts/BarChart";
import { useParams, useLocation } from "react-router-dom";

const Log = () => {

    const [logs, setLogs] = useState([])
    const [water, setWater] = useState(null)
    const [formV, setFormV] = useState(false)
    const [goalV, setGoalV] = useState(false)
    const [logDay, setLogDay] = useState(dayjs().format('YYYY-MM-DD'))
    const [totalMacros, setTotalMacros] = useState(null)
    const [nutriMacros, setNutriMacros] = useState(null)


    const initialForm ={
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        satFat: '',
        sugar: '',
        sodium: '',
        date: dayjs(),
        ingredients: ''
    }
    const initialGoals ={
        gCalories: '',
        gProtein: '',
        gCarbs: '',
        gFat: '',
        gSatFat: '',
        gSugar: '',
        gSodium: '',
        gWater: ''
    }

    const [form, setForm] = useState(initialForm)
    const [goal, setGoal] = useState(initialGoals)
    const {name, calories, protein, carbs, fat, satFat, sugar, sodium, date, ingredients} = form
    const {gCalories, gProtein, gCarbs, gFat, gSatFat, gSugar, gSodium, gWater} = goal
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        fetchLogsByDate().then(setLogs)
    }, [refresh]);

    useEffect(() => {
        const today = dayjs().format('YYYY-MM-DD');
        if (logs && logs[today]) {
            setLogDay(today);
        }
        if (logDay) {
            fetchWater(logDay)
                .then(setWater)
                .catch(err => {
                    console.error("Failed to fetch water:", err);
                    setWater(null);
                })}
        // fetchWater(logDay).then(setWater)
    }, [logs]);

    const location = useLocation();
    const redirectedWithData = !!(location.state);

    const formVisibility = () => {
        setFormV(prevState => !prevState)
    }

    useEffect(() => {
        if (location.state) {
            // const { calories, protein, carbs, fat, satFat, sugar, sodium } = location.state;
            setForm(prev => ({
                ...prev,
                ...location.state
            }));
        }
    }, [location.state]);

    const goalVisibility = () => {
        setGoalV(prevState => !prevState)
    }

    const formChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
        // console.log(form)
    }

    const goalChange = (e) => {
        setGoal({...goal, [e.target.name]:e.target.value})
        // console.log(form)
    }

    const showLog = (d) => {
        setLogDay(d)
    }

    const addLog = (e) => {
        e.preventDefault()
        const newLog = {
            name,
            calories,
            protein,
            carbs,
            fat,
            satFat,
            sugar,
            sodium,
            water,
            date
        }
        createLog(newLog)
        // console.log(logs)
        formVisibility()
        setRefresh((prev) => !prev)
        setForm(initialForm)
    }

    const subWater = async () => {
        await patchWater(water.id,-.25)
        setRefresh((prev) => !prev)
    }

    const addWater = async () => {
        await patchWater(water.id,.25)
        setRefresh((prev) => !prev)
    }

    const handleNutriApi = async () => {
        try {
            const m = await fetchMacrosFromIngredients(ingredients)
            setNutriMacros(m)
            setForm(prev => ({
                ...prev,
                ...m
            }))
        }catch (err) {
            console.error("Error fetching macros:", err);
        }
    }


    return (
        <>
            <h1>Log</h1>
            {/*Visibility for form based on macros*/}
            <button onClick={formVisibility}>Add New Log</button>
            {(formV || redirectedWithData) && (
                <Box>
                    <TextField
                        required
                        name="name"
                        label="Log Name"
                        value={name}
                        onChange={formChange}
                    />
                    <TextField
                        required
                        name="calories"
                        type={"number"}
                        label="Calories"
                        value={calories}
                        onChange={formChange}
                    />
                    <TextField
                        name="protein"
                        type={"number"}
                        label="Protein"
                        value={protein}
                        onChange={formChange}
                    />
                    <TextField
                        name="carbs"
                        type={"number"}
                        label="Carbs"
                        value={carbs}
                        onChange={formChange}
                    />
                    <TextField
                        name="fat"
                        type={"number"}
                        label="Fat"
                        value={fat}
                        onChange={formChange}
                    />
                    <TextField
                        name="satFat"
                        type={"number"}
                        label="Saturated Fat"
                        value={satFat}
                        onChange={formChange}
                    />
                    <TextField
                        name="sugar"
                        type={"number"}
                        label="Sugar"
                        value={sugar}
                        onChange={formChange}
                    />
                    <TextField
                        name="sodium"
                        type={"number"}
                        label="Sodium"
                        value={sodium}
                        onChange={formChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Date of Log"
                                value={date}
                                onChange={(newValue) => setForm(({...form, date: newValue}))}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Box>
                    <TextField
                        name="ingredients"
                        type={"text"}
                        label="Grab macros from ingredients"
                        value={ingredients}
                        onChange={formChange}
                        fullWidth
                        multiline
                        rows={2}
                    />
                    <button onClick={handleNutriApi}> Get Macros</button>
                    </Box>
                    <button onClick={() => {setForm(initialForm)}}>Reset</button>
                    <button onClick={addLog}>Submit</button>
                    <button onClick={formVisibility}>Hide</button>

                </Box>)
            }


            <button onClick={goalVisibility}>Set Goals</button>
            {goalV &&
                <Box>
                    <TextField
                        name="gCalories"
                        type={"number"}
                        label="Calories"
                        value={gCalories}
                        onChange={goalChange}
                    />
                    <TextField
                        name="gProtein"
                        type={"number"}
                        label="Protein"
                        value={gProtein}
                        onChange={goalChange}
                    />
                    <TextField
                        name="gCarbs"
                        type={"number"}
                        label="Carbs"
                        value={gCarbs}
                        onChange={goalChange}
                    />
                    <TextField
                        name="gFat"
                        type={"number"}
                        label="Fat"
                        value={gFat}
                        onChange={goalChange}
                    />
                    <TextField
                        name="gSatFat"
                        type={"number"}
                        label="Saturated Fat"
                        value={gSatFat}
                        onChange={goalChange}
                    />
                    <TextField
                        name="gSugar"
                        type={"number"}
                        label="Sugar"
                        value={gSugar}
                        onChange={goalChange}
                    />
                    <TextField
                        name="gSodium"
                        type={"number"}
                        label="Sodium"
                        value={gSodium}
                        onChange={goalChange}
                    />
                    <TextField
                        name="gWater"
                        type={"number"}
                        label="Water Intake"
                        value={gWater}
                        onChange={goalChange}
                    />
                    <button onClick={() => {setGoal(initialGoals)}}>Reset</button>
                    <button onClick={addGoal}>Submit</button>
                    <button onClick={goalVisibility}>Hide</button>
                </Box>
            }


            <Box sx={{ display: 'flex', gap: 8, mb: '5em', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <ol>
                    {Object.keys(logs).sort((a, b) => new Date(b) - new Date(a)).map(date => (

                        <p key={date} onClick={() => {showLog(date); setRefresh((prev) => !prev)}}
                            style={{ cursor: 'pointer',
                            fontWeight: logDay === date ? 'bold' : 'normal',
                            textDecoration: logDay === date ? 'underline' : 'none'}}
                        >
                            {dayjs(date).format('MMM D, YYYY')}
                        </p>
                    ))}
                </ol>
                <Box>
                    <h2>Log for {dayjs(logDay).format('MMM D, YYYY')}</h2>
                    <p>💧 Water: {water?.waterAmount ?? 0} L (Recommended 2.7L for females and 3.7L for males)</p>
                    <p>One cup is approximately .25L of water, one bottle is approximately .5L</p>
                    <button onClick={subWater}>➖</button><button onClick={addWater}>➕</button>
                    <LogList data={logs[logDay] || []} onTotalChange={setTotalMacros} />
                </Box>

                {/*All the graphs for logged data and goals*/}
                <Box>
                    <BarChart
                        xAxis={[{ data: ['Water'] }]}
                        series={[
                            { data: [Number(goal.gWater) || 0], label: 'Goal' },
                            { data: [water?.waterAmount || 0], label: 'Actual' },
                        ]}
                        height={300}
                    />

                    {totalMacros && (
                        <>
                            <BarChart
                                xAxis={[{ data: ['Calories'] }]}
                                series={[
                                    { data: [Number(goal.gCalories) || 0], label: 'Goal' },
                                    { data: [totalMacros?.calories || 0], label: 'Actual' },
                                ]}
                                height={300}
                            />

                            <BarChart
                                xAxis={[{ data: ['Protein', 'Carbs', 'Fat', 'Sugar', 'Sodium'] }]}
                                series={[
                                    {
                                        data: [
                                            Number(goal.gProtein) || 0,
                                            Number(goal.gCarbs) || 0,
                                            Number(goal.gFat) || 0,
                                            Number(goal.gSugar) || 0,
                                            Number(goal.gSodium) || 0,
                                        ],
                                        label: 'Goal',
                                    },
                                    {
                                        data: [
                                            totalMacros.protein || 0,
                                            totalMacros.carbs || 0,
                                            totalMacros.fat || 0,
                                            totalMacros.sugar || 0,
                                            totalMacros.sodium || 0,
                                        ],
                                        label: 'Actual',
                                    },
                                ]}
                                height={300}
                            />
                        </>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default Log