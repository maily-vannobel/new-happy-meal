import db from '../config/db.js';

class RecipeModel {
  // 1: Récupérer toutes les recettes
  static async getAllRecipes() {
    try {
      const [rows] = await db.query('SELECT * FROM recipes');
      return rows;
    } catch (error) {
      console.error('Erreur MySQL lors de la récupération des recettes :', error); // Afficher l'erreur dans la console
      throw error; 
    }
  }

  // 2: Récupérer recette par ID
  static async getRecipeById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM recipes WHERE recipe_id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Erreur MySQL lors de la récupération de la recette :', error); 
      throw error;
    }
  }

  // 3:Rechercher des recettes
  static async searchRecipes(query) {
    const likeQuery = `%${query}%`;
    const searchQuery = `SELECT recipe_id, name FROM recipes WHERE name LIKE ?`;
    const [rows] = await db.execute(searchQuery, [likeQuery]);
    return rows;
}

}

export default RecipeModel;
