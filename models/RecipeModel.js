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
}

export default RecipeModel;
