const UserDB = require('../models/usersModel')
const ContactDB = require('../models/contactModel')

export class Contact {
    name: string;
    email: string;
    message: string;
    answer: string;
    status: string;
    subject: string;

    constructor(name: string, email: string, subject: string, message: string) {
        this.name = name
        this.email = email
        this.subject = subject
        this.message = message
    }
}

export class Contacts {

    async addMessage(contact: Contact, idUser: string) {
        try {
            const newContact = {
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                message: contact.message,
                userId: idUser
            }

            return await ContactDB.create(newContact)
        } catch (e) {
            console.log(e.message)
        }
    }
    async getMessages() {
        const findAllMessages = await ContactDB.find({}).sort({ createdAt: -1 })
        return findAllMessages
    }

    async getMessage(id: string) {
        const message = await ContactDB.findById(`${id}`)
        return message
    }
    async answerMessage(updateMessage: Contact, id: string) {
        return await ContactDB.findByIdAndUpdate(`${id}`, updateMessage, { upsert: true, new: true })
    }

}