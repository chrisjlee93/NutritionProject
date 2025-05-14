import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import {useState, useEffect} from "react";
import { getGoal, createGoal, deleteGoal } from "./service.js";

const Landing = () => {


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

    const [goal, setGoal] = useState(initialGoals)
    const {gCalories, gProtein, gCarbs, gFat, gSatFat, gSugar, gSodium, gWater} = goal
    const [goalId, setGoalId] = useState(null);
    const [goalData, setGoalData] = useState(null);



    const goalChange = (e) => {
        setGoal({...goal, [e.target.name]:e.target.value})
        // console.log(form)
    }

    useEffect(() => {
        const loadGoal = async () => {
            const goals = await getGoal();
            if (goals.length > 0) {
                const g = goals[0]; // assuming only one goal for now
                setGoal({
                    gCalories: g.calorieGoal || '',
                    gProtein: g.proteinGoal || '',
                    gCarbs: g.carbGoal || '',
                    gFat: g.fatGoal || '',
                    gSatFat: g.satFatGoal || '',
                    gSugar: g.sugarGoal || '',
                    gSodium: g.sodiumGoal || '',
                    gWater: g.waterGoal || ''
                });
                setGoalData(g);
                setGoalId(g.id);
            }
        };
        loadGoal();
    }, []);


    const handleSave = async () => {
        const payload = {
            id: goalId, // null for create, number for update
            calorieGoal: parseFloat(gCalories),
            proteinGoal: parseFloat(gProtein),
            carbGoal: parseFloat(gCarbs),
            fatGoal: parseFloat(gFat),
            satFatGoal: parseFloat(gSatFat),
            sugarGoal: parseFloat(gSugar),
            sodiumGoal: parseFloat(gSodium),
            waterGoal: parseFloat(gWater)
        };
        const saved = await createGoal(payload);
        setGoalId(saved.id);
        setGoalData(saved); // <- this updates the summary display
        setGoal(initialGoals);
        // alert("Goal saved successfully!");

    };

    const handleDeleteGoal = async () => {
        if (goalId) {
            try {
                await deleteGoal(goalId);
                setGoal(initialGoals);
                setGoalId(null);
                setGoalData(null); // ✅ Hide summary and reset graph source
            } catch (err) {
                console.error("Failed to delete goal:", err);
                alert("Error deleting goal.");
            }
        }
    };



    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <h1>Welcome back!</h1>
                <h3>We're here to help meet your nutrition goals using food and nutrition</h3>
                <h3>To get started enter or update your nutrition goals below or look up a meal from MealDB</h3>


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

                </Box>


                <button onClick={handleSave}>Save</button>
                <button onClick={() => { setGoal(initialGoals); setGoalId(null); }}>Reset</button>



                <h2>Current Goals</h2>

                {goalData && (
                    <>
                        <h2>Current Goal Summary</h2>
                        <ul>
                            <li><strong>Calories:</strong> {goalData.calorieGoal}</li>
                            <li><strong>Protein:</strong> {goalData.proteinGoal}</li>
                            <li><strong>Carbs:</strong> {goalData.carbGoal}</li>
                            <li><strong>Fat:</strong> {goalData.fatGoal}</li>
                            <li><strong>Saturated Fat:</strong> {goalData.satFatGoal}</li>
                            <li><strong>Sugar:</strong> {goalData.sugarGoal}</li>
                            <li><strong>Sodium:</strong> {goalData.sodiumGoal}</li>
                            <li><strong>Water:</strong> {goalData.waterGoal}</li>
                        </ul>
                    </>
                )}

                <button onClick={handleDeleteGoal}>Delete</button>


            </Box>
        </>
    )
}

export default Landing