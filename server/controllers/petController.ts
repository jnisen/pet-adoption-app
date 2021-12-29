import { Pets, Pet } from '../data/petsDb'
const pets = new Pets()

const cloudinary = require('../config/cloudinary')


export async function addPets(req, res) {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        const { type, name, height, weight, color, bio, hypoallergenic, dietaryRestriction, breed } = req.body

        const picture = result.secure_url
        const cid = result.public_id

        const hypoBoolean: boolean = hypoallergenic === 'Yes' ? true : false

        const pet = new Pet(type, name, picture, height, weight, color, bio, hypoBoolean, dietaryRestriction, breed, cid)

        await pets.addPet(pet)

        res.send("Pet Added")
    } catch (e) {
        res.status(400).send(e.message)
    }
}

export async function getAllPets(req, res) {

    try {
        const petsAll = await pets.readPets()
        res.send(petsAll)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

export async function getPet(req, res) {
    try {
        const { id } = req.params
        const pet = await pets.findPetById(id)
        res.send(pet)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

export async function searchPet(req, res) {
    try {
        const result = await pets.searchPet(req.query)
        res.send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

export async function updatePet(req, res) {
    try {
        const { id } = req.params
        let pet = await pets.findPetById(id)

        if (req.file) {
            await cloudinary.uploader.destroy(pet.cloudinary_id)
            const result = await cloudinary.uploader.upload(req.file.path);
            pet.picture = result.secure_url
            pet.cid = result.public_id
        }

        const { type, name, height, weight, color, bio, hypoallergenic, dietaryRestriction, breed } = req.body

        pet.name = name
        pet.color = color
        pet.type = type
        pet.weight = weight
        pet.breed = breed
        pet.hypoallergenic = hypoallergenic === 'Yes' ? true : false
        pet.dietaryRestriction = dietaryRestriction
        pet.breed = breed
        pet.height = height
        pet.bio = bio


        const petUpdate = await pets.updatePet(id, pet)
        res.send({ pet: petUpdate, message: 'Update Pet' })
    } catch (e) {
        res.status(404).send(e.message)
    }
}

export async function adoptFoster(req, res) {
    try {
        const { id } = req.params
        const { status } = req.body
        const obj = await pets.adoptFoster(id, req.user.userID, status)
        res.send({ user: obj.user, pets: obj.pets, message: 'Adopt/foster pet' })
    } catch (e) {
        res.send(400).message(`${e}`)
    }
}

export async function returnPet(req, res) {
    try {
        const { id } = req.params
        const obj = await pets.returnPet(id, req.user.userID)
        res.send({ user: obj.user, pets: obj.pets, message: 'return pet' })
    } catch (e) {
        res.send(400).message(`${e}`)
    }
}

export async function savePet(req, res) {
    try {
        const { id } = req.params
        const user = await pets.savePet(id, req.user.userID)
        res.send({ user: user, message: 'Save Pet Success' })
    } catch (e) {
        res.send(400).message(`${e}`)
    }
}

export async function deleteSavedPet(req, res) {
    try {
        const { id } = req.params
        const user = await pets.deleteSavedPet(id, req.user.userID)
        res.send({ user: user, message: 'Delete Pet Success' })
    } catch (e) {
        res.send(400).message(`${e}`)
    }
}
