import { Contacts } from "../schemas/Contact-shema";

const app = require('express')();
export const postContacts = () => {
    return app.post('/', async (req: any, res: any) => {
        try {
            const reqPayload = req.body;
            const resid = await Contacts.countDocuments();
            const record = {
                ...reqPayload,
                "id": resid !== null && resid !== undefined ? resid + 1 : 1,
                "linkedId": null,
                "linkPrecedence": "primary",
                "createdAt": Date.now(),
                "updatedAt": Date.now(),
                "deletedAt": null,
            }
            const matchedPhoneNumber = await Contacts.findOne({ phoneNumber: reqPayload.phoneNumber });
            const matchedEmail = await Contacts.findOne({ email: reqPayload.email });
            const firstRecord = await Contacts.findOne({ $or: [{ email: reqPayload.email }, { phoneNumber: reqPayload.phoneNumber }] }) || record;
            if (firstRecord && firstRecord.id!=record.id) {
                await Contacts.updateMany({ id: { $ne: firstRecord.id }, $or: [{ email: reqPayload.email }, { phoneNumber: reqPayload.phoneNumber }] }, {$set:{ "linkPrecedence": "secondary", "linkedId": firstRecord.linkPrecedence === "primary" ? firstRecord.id : firstRecord.linkedId }});
            }
            if ((matchedPhoneNumber === null || matchedPhoneNumber === undefined) || (matchedEmail === null || matchedEmail === undefined)) {
                await Contacts.create({ ...record, "linkPrecedence": firstRecord && firstRecord.id!=record.id ? "secondary" : "primary", "linkedId": (firstRecord && firstRecord.linkPrecedence === "primary"  && firstRecord.id!=record.id ? firstRecord.id : firstRecord ? firstRecord.linkedId : null) });
            }
            const secondaryContactsList = await Contacts.find({ linkPrecedence: 'secondary', linkedId: firstRecord.linkPrecedence === "primary" ? firstRecord.id : firstRecord ? firstRecord.linkedId : null });
            const contactsList = await Contacts.find({ id: firstRecord && firstRecord.id, linkedId: firstRecord && firstRecord.linkedId });
            const response = {
                "contact": {
                    "primaryContactId": firstRecord && firstRecord.linkPrecedence === "primary" ? firstRecord.id : firstRecord ? firstRecord.linkedId : null,
                    "emails": [...new Set(contactsList ? contactsList.map((contact: any) => contact.email) : [])],
                    "phoneNumbers": [...new Set(contactsList ? contactsList.map((contact: any) => contact.phoneNumber) : [])],
                    "secondaryContactIds": secondaryContactsList ? secondaryContactsList.map((contact: any) => contact.id) : []
                }
            }
            res.status(200).send(response);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    })
}