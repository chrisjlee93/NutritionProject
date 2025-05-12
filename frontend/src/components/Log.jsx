import {useEffect, useState} from "react";
import {createLog, fetchLogs, fetchLogsByDate} from "./service.js";
import LogList from "./LogList.jsx";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Log = () => {

    const [logs, setLogs] = useState([])
    const [water, setWater] = useState(null)
    const [formV, setFormV] = useState(false)
    const [log, setLog] = useState([])
    const [logVisibility, setLogVisibility] = useState(false)
    const [logDay, setLogDay] = useState(dayjs().format('YYYY-MM-DD'))

    const initalForm ={
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        satFat: '',
        sugar: '',
        sodium: '',
        waterIntake: '',
        date: dayjs()

    }

    const [form, setForm] = useState(initalForm)
    const {name, calories, protein, carbs, fat, satFat, sugar, sodium, waterIntake, date} = form
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        fetchLogsByDate().then(setLogs)
    }, [refresh]);

    useEffect(() => {
        const today = dayjs().format('YYYY-MM-DD');
        if (logs && logs[today]) {
            setLogDay(today);
        }
    }, [logs]);

    const formVisibility = () => {
        setFormV(prevState => !prevState)
    }

    const formChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
        console.log(form)
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
        console.log(logs)
        formVisibility()
        setRefresh((prev) => !prev)
        setForm(initalForm)

    }

    return (
        <>
            <h1>Log</h1>

            <button onClick={formVisibility}>Add New Log</button>
            {formV &&
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
                    <TextField
                        name="waterIntake"
                        type={"number"}
                        label="Cups of Water"
                        value={waterIntake}
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

                    <button onClick={() => {setForm(initalForm)}}>Reset</button>
                    <button onClick={addLog}>Submit</button>
                </Box>
            }
            <Box sx={{ display: 'flex', gap: 8, mb: '5em', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <ol>
                    {Object.keys(logs).sort((a, b) => new Date(b) - new Date(a)).map(date => (
                        <p key={date} onClick={() => showLog(date)}
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
                    {/*<p>💧 Water: {logs.waterLog.waterAmount} cups </p>*/}
                    <LogList data={logs[logDay] || []} />
                </Box>
            </Box>


        </>
    )
}

export default Log