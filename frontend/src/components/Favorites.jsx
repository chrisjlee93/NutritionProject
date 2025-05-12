import {fetchMeals} from "./service.js";
import {useEffect, useState} from "react";
import FavoritesCard from "./FavoritesCard.jsx";
import Box from "@mui/material/Box";

const Favorites = () => {

    const [favorites, setFavorites] = useState([])
    const [refresh, setRefresh] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        fetchMeals().then(setFavorites)
    }, [refresh]);


    // Get unique, sorted category list
    const categoryList = favorites
        ? Array.from(new Set(favorites.map(meal => meal.category || "Uncategorized"))).sort()
        : [];

    // Handle checkbox selection
    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Group meals by category
    const groupedFavorites = favorites.reduce((acc, meal) => {
        const cat = meal.category || "Uncategorized";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(meal);
        return acc;
    }, {});

    const handleClick = async () => {
        await fetchMeals().then(setFavorites)
    }

    const handleClick2 = async () => {
        console.log(favorites)
    }

    const onDelete = () => {
        setRefresh(prev => !prev)
    }

    return (
        <>
            <h1> Your Favorites!!! </h1>

            {/*<button onClick={handleClick}> Test for axios</button>*/}
            {/*<button onClick={handleClick2}> test state</button>*/}

            <div>
                <p>Leave Blank to See all</p>
            </div>
            {/* Category filter checkboxes */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                {categoryList.map(cat => (
                    <label key={cat}>
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                        />
                        {cat}
                    </label>
                ))}
            </Box>

            {/* Grouped and filtered results */}
            {Object.keys(groupedFavorites)
                .sort()
                .filter(category =>
                    selectedCategories.length === 0 || selectedCategories.includes(category)
                )
                .map(category => (
                    <Box key={category} sx={{ mb: 4, width: '100%' }}>
                        <h2>{category}</h2>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 16,
                                justifyContent: "center"
                            }}
                        >
                            {groupedFavorites[category].map(meal => (
                                <FavoritesCard key={meal.id} meal={meal} onDelete={onDelete} />
                            ))}
                        </div>
                    </Box>
                ))}


            {/*<div*/}
            {/*    style={{*/}
            {/*        display: "flex",*/}
            {/*        flexWrap: "wrap",*/}
            {/*        gap: 16,*/}
            {/*        justifyContent: "center"*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {favorites &&*/}
            {/*    favorites.map(*/}
            {/*        el =>*/}
            {/*            <FavoritesCard meal={el} onDelete={onDelete}/>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</div>*/}
        </>
    )

}

export default Favorites
