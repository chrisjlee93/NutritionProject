import axios from "axios";

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