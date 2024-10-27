import db from '../config/db.js';

class IngredientModel {
    
    //? 1: Récupérer tous les ingrédients
    static async getAllIngredients() {
        const query = 'SELECT * FROM ingredients';
        const [rows] = await db.execute(query);
        return rows;
    }

    //? 2: Récupérer les ingrédients par ID de recette
    static async getIngredientsByRecipe(recipe_id) {
        const query = `
            SELECT i.name, ri.quantity, ri.unit 
            FROM ingredients i
            JOIN recipe_ingredients ri ON i.ingredient_id = ri.ingredient_id
            WHERE ri.recipe_id = ?
        `;
        const [rows] = await db.execute(query, [recipe_id]);
        return rows;
    }

    //? 3: Ajouter un nouvel ingrédient
    static async addIngredient(name, category, quantity, unit) {
        const query = `INSERT INTO ingredients (name, category, quantity, unit) VALUES (?, ?, ?, ?)`;
        const [result] = await db.execute(query, [name, category, quantity, unit]);
        return result.insertId;
    }
    
    //? 4: Mettre à jour un ingrédient
    static async updateIngredient(id, name, category, quantity, unit) {
        const query = `UPDATE ingredients SET name = ?, category = ?, quantity = ?, unit = ? WHERE ingredient_id = ?`;
        await db.execute(query, [name, category, quantity, unit, id]);
    }
    
    //? 5: Supprimer un ingrédient
    static async deleteIngredient(id) {
        const query = `DELETE FROM ingredients WHERE ingredient_id = ?`;
        await db.execute(query, [id]);
    }
}

export default IngredientModel;

