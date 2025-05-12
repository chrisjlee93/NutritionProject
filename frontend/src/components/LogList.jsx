import {useEffect, useState} from "react";
import {deleteLog} from "./service.js";
import {margin} from "@mui/system";

const LogList = ({ data }) => {

    const [logList, setLogList] = useState(data || [])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        setLogList(data || []);
        console.log(data)
    }, [data,refresh]);

    if (!Array.isArray(data)) return null;
    if (data.length === 0) return <p>No logs for this day.</p>;

    const total = logList.reduce(
        (tot, log) => {
            tot.calories += log.macros.calories || 0;
            tot.protein += log.macros.protein || 0;
            tot.carbs += log.macros.carbs || 0;
            tot.fat += log.macros.fat || 0;
            tot.satFat += log.macros.satFat || 0;
            tot.sugar += log.macros.sugar || 0;
            tot.sodium += log.macros.sodium || 0;
            return tot;
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0, satFat: 0, sugar:0, sodium: 0 }
    );

    const handleDelete = (id) => {
        deleteLog(id)
        setRefresh((prev) => !prev)
    }

    return (
        <div>
        <ul>
            {logList.map((log) => (
                <li key={log.id}>
                    <strong style={{marginRight: '10px'}}>{log.name}</strong>
                    <button onClick={() => {handleDelete(log.id)}}>Delete</button>

                    <ul>
                        <li>
                            {log.macros.calories} kcal
                        </li>
                        <li>
                            {log.macros.protein}g Protein
                        </li>
                        <li>
                            {log.macros.carbs}g Carbs
                        </li>
                        <li>
                            {log.macros.fat}g Total Fat
                        </li>
                        <li>
                            {log.macros.satFat}g Saturated Fat
                        </li>
                        <li>
                            {log.macros.sugar}g Sugar
                        </li>
                        <li>
                            {log.macros.sodium}g Sodium
                        </li>
                    </ul>

                </li>
            ))}
            <li>
                <strong>Total</strong>
                <ul>
                    <li>
                        {total.calories} kcal
                    </li>
                    <li>
                        {total.protein}g Protein
                    </li>
                    <li>
                        {total.carbs}g Carbs
                    </li>
                    <li>
                        {total.fat}g Total Fat
                    </li>
                    <li>
                        {total.satFat}g Saturated Fat
                    </li>
                    <li>
                        {total.sugar}g Sugar
                    </li>
                    <li>
                        {total.sodium}g Sodium
                    </li>
                </ul>
            </li>
        </ul>
        </div>

    );
};

export default LogList