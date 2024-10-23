document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value;
        if (query.length > 2) { // Lancer la recherche après 3 caractères
            try {
                const response = await fetch(`/search/autocomplete?query=${query}`);
                const results = await response.json();
                displayResults(results);
            } catch (error) {
                console.error('Erreur lors de la recherche :', error);
            }
        } else {
            searchResults.innerHTML = ''; // Efface les résultats si moins de 3 caractères
        }
    });

    function displayResults(results) {
        searchResults.innerHTML = ''; // Efface les anciens résultats
        results.forEach(recipe => {
            const div = document.createElement('div');
            div.className = 'autocomplete-result';
            div.textContent = recipe.name;
            div.addEventListener('click', () => {
                window.location.href = `/recipes/${recipe.recipe_id}`;
            });
            searchResults.appendChild(div);
        });
    }
});
