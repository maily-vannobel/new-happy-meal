import mysql from 'mysql2';

// Configuration de la connexion à la base de données avec des options
const pool = mysql.createPool({
  host: 'localhost',     // Hôte (localhost signifie que MySQL tourne sur ta machine)
  user: 'root',          // Nom d'utilisateur MySQL (ici "root")
  password: '',          // Mot de passe MySQL (ici vide pour root)
  database: 'happymeal', // Nom de la base de données à utiliser
  waitForConnections: true, // Attend que des connexions soient disponibles si le pool est plein
  connectionLimit: 10,      // Limite du nombre de connexions dans le pool
  queueLimit: 0             // Pas de limite pour les requêtes en attente
});

export default pool.promise();
