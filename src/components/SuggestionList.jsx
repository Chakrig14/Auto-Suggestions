import "../assets/css/suggestionlist.css";

const SuggestionList = ({ recipeData, selectedRecipe, previousData, highlightInput }) => {
    const getHighlightedInput = (text, name) => {
        const parts = name.split(new RegExp(`(${text})`, "gi"))
        return (
            <span>
                {parts.map((part, index) => {
                    return part?.toLowerCase() === text?.toLowerCase() ? (<b key={index}>{part}</b>) : part
                })}
            </span>
        )
    }
    return (
        <>
            <ul className="suggestion-list">
                {previousData && previousData.map((recipe, id) => <li key={id} onClick={() => selectedRecipe(recipe)}>{getHighlightedInput(highlightInput, recipe?.name)}</li>)}
                {recipeData && recipeData.map(
                    (recipe, id) =>
                        <li key={id} onClick={() => selectedRecipe(recipe)}>{getHighlightedInput(highlightInput, recipe?.name)}</li>
                )}
            </ul>
        </>
    )
}

export default SuggestionList;