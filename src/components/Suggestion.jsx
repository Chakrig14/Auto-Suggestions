import { useCallback, useEffect, useState } from "react";
import "../assets/css/suggestion.css"
import SuggestionList from "./SuggestionList";
import axios from "axios";
import { debounce } from "lodash";

const Suggestion = () => {
    const [inputValue, setInputValue] = useState("");
    const [resultData, setResultData] = useState([])
    const [localData, setLocalData] = useState([]);
    const fetchSuggestions = async (value) => {
        const data = await axios.get(`https://dummyjson.com/recipes/search?q=${value}`);
        const recipesData = data.data;
        const localDataIds = localData.map((lcData) => lcData.id);
        const filteredData = recipesData.recipes.filter((recipe) => !localDataIds.includes(recipe.id));
        setResultData(filteredData);
    }

    const debouceSuggest = useCallback(debounce(fetchSuggestions, 300), []);

    const handleSelectedRecipe = (recipe) => {
        setInputValue(recipe?.name);
        const newLocalData = [...localData, recipe];
        setLocalData(newLocalData);
        localStorage.setItem("localSuggestionData", JSON.stringify(newLocalData))
    }

    const fetchLocalData = () => {
        const getLocalData = localStorage.getItem("localSuggestionData");
        setLocalData(getLocalData ? JSON.parse(getLocalData) : []);
    }
    useEffect(() => {
        fetchLocalData();
    }, [])

    useEffect(() => {
        debouceSuggest(inputValue);
    }, [inputValue, debouceSuggest])
    return (
        <>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter the recipe" className="search-box" />
            {inputValue.length > 0 && <SuggestionList highlightInput={inputValue} recipeData={resultData} selectedRecipe={handleSelectedRecipe} previousData={localData} />}
        </>
    )
}

export default Suggestion;