const UserDB = require('../models/usersModel')
const petDB = require('../models/petsModel')

export class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    bio: string;
    role: string;
    savedPets: Array<Pet>;
    adoptedFosterPets: Array<Pet>
    lastLoginAt: Date

    constructor(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, phoneNumber: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.confirmPassword = confirmPassword
        this.phoneNumber = phoneNumber
    }
}

export class Users {

    async addUser(newUser: User) {
        try {
            return await UserDB.create(newUser)
        } catch (e) {
            console.log(e.message)
        }
    }

    async getUserPetsById(id: string) {
        try {
            const findUser = await UserDB.findById(`${id}`, { _id: 0, createdDate: 0, __v: 0, role: 0 });
            const adoptedFosterpets = await petDB.find({ _id: { $in: findUser.adoptedFosterPets } })
            const savedPets = await petDB.find({ _id: { $in: findUser.savedPets } })
            const userAndPets = {
                user: findUser,
                adoptedFosterpets: adoptedFosterpets,
                savedPets: savedPets
            }
            return userAndPets
        } catch (e) {
            console.log(e)
        }
    }

    async getUserByID(id: string) {
        try {
            const findUser = await UserDB.findById(`${id}`, { _id: 0, createdDate: 0, __v: 0, role: 0 });
            return findUser
        } catch (e) {
            console.log(e)
        }
    }

    async readUsers() {
        try {
            return await UserDB.find({}, { password: 0, confirmPassword: 0, createdDate: 0, __v: 0 })
        } catch (e) {
            console.log(e)
        }
    }

    async findUserByEmail(email: string) {
        try {
            const findUser = await UserDB.findOne({ email })
            return findUser
        } catch (e) {
            console.log(e)
        }
    }

    async updateUser(id: string, updateUser: User) {
        try {
            return await UserDB.findByIdAndUpdate(`${id}`, updateUser, { upsert: true, new: true })
        } catch (e) {
            console.log(e)
        }
    }

    async userToAdmin(id: string) {
        try {
            return await UserDB.findByIdAndUpdate(`${id}`, { $unset: { savedPets: "", adoptedFosterPets: "" } }, { upsert: true, new: true })
        } catch (e) {
            console.log(e)
        }
    }


    async getUser(id: string) {
        const findUser = await UserDB.findById(`${id}`, { firstName: 1, lastName: 1, _id: 1, role: 1 })
        const user = {
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            userId: findUser._id.toString(),
            role: findUser.role
        }
        return user
    }



}


