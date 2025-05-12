import axios from "axios";

// Don't need this anymore since we are using a proxy
// const baseUrl = "http://localhost:8080/api/meals"

export const fetchMeals = async () => {
    const res = await axios.get('/api/meals')
    return (res.data)
}

export const fetchMealById = async (id) => {
    const res = await axios.get(`/api/meals/${id}`)
    return (res.data)
}

export const addMeals = async (meal) => {
    const res = await axios.post('/api/meals', meal);
    return res.data;
}

export const deleteMeal = async (id) => {
    await axios.delete(`/api/meals/${id}`)
}

export const fetchLogs = async () => {
    try {
        const res = await axios.get('/api/logs');
        return res.data;
    } catch (error) {
        console.error("Error fetching logs:", error);
        return [];
    }
};


export const fetchLogsByDate = async () => {
    const res = await axios.get('/api/logs/by-date')
    return (res.data)
}

export const fetchWater = async () => {
    const res = await axios.get('/api/logs')
    return (res.data)
}

export const createLog = async (log) => {
    const res = await axios.post('/api/logs',log)
    return (res.data)
}

export const deleteLog = async (id) => {
    const res = await axios.delete(`/api/logs/${id}`)
    return (res.data)
}