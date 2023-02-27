const express = require("express")
const router = new express.Router()
const ExpressError = require("../expresserror")
const db = require('../db')
const { Pet } = require('../models/pets')
const jsonschema = require('jsonschema')
const petSchema = require('../schemas/petSchema.json')



router.get("/", async function(req, res, next) {
   try {
      const pets = await Pet.getAll()
      return res.json(pets)
   } catch(e) {
      return next(e)
   }
})

router.get("/:id", async function (req, res, next) {
   try {
      const id = req.params.id;
      const results = await Pet.get(id)
      return res.json(results)
   } catch(e) {
      return next(e)
   }
})

router.post("/", async function (req, res, next) {
   try {
      const validate = jsonschema.validate(req.body, petSchema)
      if (!validate.valid) {
         const errorList = validate.errors.map(e => e.stack);
         const err = new ExpressError(errorList, 400);
         return next(err)
      }
      const { name, age, species, coolness } = req.body
      const newPet = await Pet.create(name, age, species, coolness)      
      return res.json(newPet)
   } catch(e) {
      return next(e)
   }
})

router.patch("/:id", async function (req, res, next) {
   try {
      const pet = await Pet.get(req.params.id)
      const { name, age, species, coolness } = req.body
      pet.update(name, age, species, coolness)
      pet.save()
      return res.json(pet)
   } catch(e) {
      return next(e)
   }
})

router.delete("/:id", async function (req, res, next) {
   try {
      const id = req.params.id
      const pet = await Pet.get(id)
      pet.removePet(req.params.id)
      
      return res.json({msg: 'DELETED'})
   } catch(e) {
      return next(e)
   }
})

module.exports = router;