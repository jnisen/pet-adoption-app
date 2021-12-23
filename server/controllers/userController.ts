
require('dotenv').config();

import { Users, User } from '../data/usersDb'
const users = new Users()

const admin = process.env.ADMIN.split(' ')


export async function addUser(req, res) {
    try {
        const { firstName, lastName, email, password, confirmPassword, phoneNumber} = req.body
        const user = new User(firstName, lastName, email, password, confirmPassword, phoneNumber)
        admin.includes(email) ? user.role = 'admin' : user.role = 'public'
        const role = admin.includes(email) ? user.role = 'admin' : user.role = 'public'
        if (role === 'public') {
            user.savedPets = []
            user.adoptedFosterPets = []
            user.bio = ''
        }
        await users.addUser(user)
        res.send('User Added')
    } catch (e) {
        res.status(404).send(`${e}`)
    }
}

export async function getAllUsers(req, res) {
    try {
        const allUsers = await users.readUsers()
        res.send(allUsers)
    } catch (e) {
        res.status(404).send(`${e}`)
    }
}

export async function getUser(req, res) {
    try {
        const { id } = req.params
        const user = await users.getUserById(id)
        res.send(user)
    } catch (e) {
        res.status(404).send(`${e}`)
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params
        const user = await users.updateUser(id, req.body)
        res.send({ user: user, message: 'Update User' })
    } catch (e) {
        res.status(404).send(`${e}`)
    }
}

export async function login(req, res) {
    try {
        const { email } = req.body
        const findUser: any = await users.findUserByEmail(email)
        const user = {
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            userId: findUser._id,
            role: findUser.role
        }
        res.send(user)

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}


export async function getCurrentUser(req, res) {
    const { userID } = req.user
    const findUser: any = await users.getUser(userID)
    res.send(findUser)
}