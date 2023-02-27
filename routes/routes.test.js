process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

const testPet = await db.query('INSERT INTO pets (name, age, species, coolness) VALUES ($1, $2, $3, $4)', ['John', 23, 'Human', 2])


describe("GET /pets", () => {
   test('Gets list of pets', async () => {
      const resp = await request(app).get('/pets');
      expect(resp.statusCode).toBe(200);
      
      expect(resp.body).toEqual({name:'John', age:23, species:'Human', coolness: 2})
   })
})


describe("GET /pets/:id", () => {
   test('Gets one specific pets', async () => {
      const resp = await request(app).get('/pets/1');
      expect(resp.statusCode).toBe(200);
      
      expect(resp.body).toEqual({name:'John', age:23, species:'Human', coolness: 2})
   })
})


describe("POST /pets", () => {
   test('Posts new pet', async () => {
      const resp = await request(app).get('/pets').send({name:'Steven', age:25, species:'Loser', coolness: 23});
      expect(resp.statusCode).toBe(200);
      
      expect(resp.body).toEqual({})
   })
})


describe("PATCH /pets/:id", () => {
   test('edits specific pet', async () => {
      const resp = await request(app).get('/pets/1').send({name:'John', age:23, species:'Glimblork', coolness: 5});
      expect(resp.statusCode).toBe(203);
      
      expect(resp.body).toEqual({name:'John', age:23, species:'Glimblork', coolness: 5})
   })
})


describe("DELETE /pets/:id", () => {
   test('deleted specific pet by id', async () => {
      const resp = await request(app).get('/pets/1');
      expect(resp.statusCode).toBe(403);
      
      expect(resp.body).toEqual({msg: 'DELETED'})
   })
})
