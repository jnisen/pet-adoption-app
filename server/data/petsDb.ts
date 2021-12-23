const petDB = require('../models/petsModel')
const userDB = require('../models/usersModel')

const _ = require('lodash');

export class Pet {
    id: string;
    type: string;
    name: string;
    status: string;
    picture: string;
    height: number;
    weight: number;
    minheight: number;
    maxheight: number;
    minweight: number;
    maxweight: number;
    color: string;
    bio: string;
    hypoallergenic: boolean;
    dietaryRestriction: string;
    breed: string;
    cloudinary_id: string;

    constructor(type: string, name: string, picture: string, height: number, weight: number, color: string, bio: string, hypoallergenic: boolean,
        dietaryRestriction: string, breed: string, cloudinary_id: string) {

        this.type = type
        this.name = name
        this.picture = picture
        this.height = height
        this.weight = weight
        this.color = color
        this.bio = bio
        this.hypoallergenic = hypoallergenic
        this.dietaryRestriction = dietaryRestriction
        this.breed = breed
        this.cloudinary_id = cloudinary_id

    }
}

export class Pets {
    pets: Array<Pet>

    async addPet(newPet: Pet) {
        try {
            return await petDB.create(newPet)
        } catch (e) {
            console.log(e)
        }
    }

    async readPets() {
        try {
            return await petDB.find()
        } catch (e) {
            console.log(e)
        }
    }

    async findPetById(id: string) {
        try {
            const findPet = await petDB.findById(`${id}`)
            return findPet
        } catch (e) {
            console.log(e)
        }
    }

    async searchPet(searchPet: Pet) {
        try {
            const query = _(searchPet).omit(_.isUndefined, _.isNull, "minheight", "maxheight", "minweight", "maxweight", "name").value()
            let result = await petDB.find(query, { createdAt: 0, updatedAt: 0, __v: 0 })
            let regex = new RegExp(`^${searchPet.name}`)
            if (searchPet.name) result = result.filter(pet => regex.test(pet.name))
            if (searchPet.minheight) result = result.filter(pet => searchPet.minheight <= pet.height)
            if (searchPet.maxheight) result = result.filter(pet => searchPet.maxheight >= pet.height)
            if (searchPet.minweight) result = result.filter(pet => searchPet.minweight <= pet.weight)
            if (searchPet.maxweight) result = result.filter(pet => searchPet.maxweight >= pet.weight)

            return result
        } catch (e) {
            console.log(e)
        }
    }

    async updatePet(id: string, updatePet: Pet) {
        try {
            return await petDB.findByIdAndUpdate(`${id}`, updatePet)
        } catch (e) {
            console.log(e)
        }
    }

    async adoptFoster(idPet: string, userID: string, status: string) {

        try {

            const findPet = await this.findPetById(idPet)
            findPet.status = status
            await petDB.findByIdAndUpdate(`${idPet}`, findPet)

            let user = await userDB.findById(`${userID}`)

            if (findPet.status !== 'Available') {
                if (!user.adoptedFosterPets.includes(idPet)) {
                    const adoptedFosterPets = [...user.adoptedFosterPets, idPet]
                    user.adoptedFosterPets = adoptedFosterPets
                    user = await userDB.findByIdAndUpdate(`${userID}`, user, { new: true, upsert: true })
                }
                const pets = await petDB.find()
                return { user: user, pets: pets }
            } else throw new Error('There is an error')



        } catch (e) {
            return e
        }
    }

    async returnPet(idPet: string, userID: string) {

        try {
            const findPet = await this.findPetById(idPet)
            findPet.status = 'Available'
            await petDB.findByIdAndUpdate(`${idPet}`, findPet)

            const findUser = await userDB.findById(`${userID}`)

            if (findUser.adoptedFosterPets.includes(idPet)) {
                findUser.adoptedFosterPets = findUser.adoptedFosterPets.filter(pet => pet !== idPet)
                const user = await userDB.findByIdAndUpdate(`${userID}`, findUser, { new: true, upsert: true })
                const pets = await petDB.find()
                return { user: user, pets: pets }
            } else throw new Error('Something wrong in this this pet')



        } catch (e) {
            return e
        }
    }
    async savePet(idPet: string, userID: string) {
        try {

            const findUser = await userDB.findById(`${userID}`)

            if (!findUser.savedPets.includes(idPet)) {
                const user = await userDB.findByIdAndUpdate(`${userID}`, { $push: { savedPets: idPet } }, { new: true, upsert: true })
                return user
            } else throw new Error('You have already saved this pet')



        } catch (e) {
            return e
        }
    }
    async deleteSavedPet(idPet: string, userID: string) {
        try {
            const findUser = await userDB.findById(`${userID}`)
            if (findUser.savedPets.includes(idPet)) {
                const findUser = await userDB.findByIdAndUpdate(`${userID}`, { $pull: { savedPets: { $in: [idPet] } } }, { new: true, upsert: true })
                return findUser
            } else throw new Error('Something wrong in this this pet')

        } catch (e) {
            return e
        }
    }

}
