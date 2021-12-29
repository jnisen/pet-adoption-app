require('dotenv').config();

import { Contact, Contacts } from '../data/contactDb'
const contacts = new Contacts()

export async function addMessage(req, res) {
    try {
        const { id } = req.params
        const { name, email, message, subject } = req.body
        const contact = new Contact(name, email, message, subject)
        await contacts.addMessage(contact, id)
        res.send('Messages Sent')
    } catch (e) {
        res.status(404).send(`${e}`)
    }
}

export async function getMessages(req, res) {
    try {
        const messages = await contacts.getMessages()
        res.send({ messages })
    } catch (e) {
        res.status(404).send(`${e}`)
    }
}

export async function getMessage(req, res) {
    try {
        const { id } = req.params
        const message = await contacts.getMessage(id)
        res.send({ message: message })
    } catch (e) {
        res.status(404).send(`${e}`)
    }
}

export async function answerMessage(req, res) {
    try {
        const { id } = req.params
        const message = await contacts.answerMessage(req.body, id)
        res.send('Message Answered')
    } catch (e) {
        res.status(404).send(`${e}`)
    }
}