import axios from "axios";

// Don't need this anymore since we are using a proxy
// const baseUrl = "http://localhost:8080/api/meals"


// All the Meal API calls
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

// Water Update methods
export const fetchWater = async (date) => {
    const res = await axios.get(`/api/water/${date}`)
    return (res.data)
}

export const patchWater = async (id, amount) => {
    const res = await axios.patch(`/api/water/${id}?amount=${amount}`);
    return res.data;
};


// Log API calls
export const createLog = async (log) => {
    const res = await axios.post('/api/logs',log)
    return (res.data)
}

export const deleteLog = async (id) => {
    const res = await axios.delete(`/api/logs/${id}`)
    return (res.data)
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

export const fetchLogsByDate = async (goal) => {
    const res = await axios.get('/api/logs/by-date')
    return (res.data)
}

export const createGoal = async  (goal) => {
    const res = await axios.post('/api/goals', goal)
    return (res.data)
}

export const getGoal = async  () => {
    const res = await axios.get('/api/goals')
    return (res.data)
}

export const deleteGoal = async  (id) => {
    const res = await axios.delete(`/api/goals/${id}`)
    return (res.data)
}





const NUTRITIONIX_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

export const fetchMacrosFromIngredients = async (ingredientText) => {
    const headers = {
        'x-app-id': import.meta.env.VITE_NUTRITIONIX_APP_ID,
        'x-app-key': import.meta.env.VITE_NUTRITIONIX_APP_KEY,
        'Content-Type': 'application/json',
    };

    const body = {
        query: ingredientText,
    };

    const response = await axios.post(NUTRITIONIX_URL, body, { headers });

    const foods = response.data.foods;

    // Total all the macros
    const total = foods.reduce((sum, item) => {
        sum.calories += item.nf_calories || 0;
        sum.protein += item.nf_protein || 0;
        sum.carbs += item.nf_total_carbohydrate || 0;
        sum.fat += item.nf_total_fat || 0;
        sum.sugar += item.nf_sugars || 0;
        sum.sodium += item.nf_sodium || 0;
        return sum;
    }, {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        sugar: 0,
        sodium: 0
    });

    return total;
};