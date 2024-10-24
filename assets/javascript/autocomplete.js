document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Efface résultats existants du conteneur
    function clearResults() {
        while (searchResults.firstChild) {
            searchResults.removeChild(searchResults.firstChild);
        }
    }

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();
        if (query.length > 1) { // Lancer la recherche après 3 caractères
            try {
                const response = await fetch(`/recipes/search/autocomplete?query=${query}`);
                const results = await response.json();
                displayResults(results);
            } catch (error) {
                console.error('Erreur lors de la recherche :', error);
            }
        } else {
            clearResults(); // Efface les résultats si moins de 3 caractères
        }
    });

    function displayResults(results) {
        clearResults(); // Efface les anciens résultats avant d'afficher les nouveaux

        if (results.length === 0) {
            const noResultDiv = document.createElement('div');
            noResultDiv.className = 'autocomplete-no-result';
            noResultDiv.textContent = 'Aucune recette trouvée';
            searchResults.appendChild(noResultDiv);
            return;
        }

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
