const db = require("../db")
const ExpressError = require("../expresserror")

class Pet {
   constructor(pet_id, name, age, species, coolness) {
      this.pet_id = pet_id
      this.name = name
      this.species = species
      this.age = age
      this.coolness = coolness
   }

   static async getAll() {
      const results = await db.query('SELECT * FROM pets');
      return results.rows
   }

   static async get(id) {
      const results = await db.query(`SELECT * FROM pets WHERE pet_id=$1`, [id])
      const pet = results.rows.map(r => new Pet(r.pet_id, r.name, r.age, r.species, r.coolness));
      if (results.rows.length === 0) {
         throw new ExpressError('Pet not found', 404)
      }
      return pet[0]
   }

   static async create(name, age, species, coolness) {
      const newPet = new Pet(name, species, age, coolness)
      const results = await db.query('INSERT INTO pets (name, age, species, coolness) VALUES ($1, $2, $3, $4) RETURNING *', [name, age, species, coolness])
      return results.rows[0]
   }

   async removePet(id) {
      await db.query('DELETE FROM pets WHERE pet_id=$1', [id])

   }

   async update(name, age, species, coolness) {
       this.name = name
       this.age = age
       this.species = species
       this.coolness = coolness
   }
   async save() {
      await db.query('UPDATE pets SET name = $1, age = $2, species = $3, coolness = $4 WHERE name = $1 RETURNING *', [this.name, this.age, this.species, this.coolness])
   }
}

module.exports = { Pet }