import { controllerWrapper } from "../decorators/controllerWrapper.js";
import contactsService from "../models/contacts.js";
import HttpError from "../utils/HttpError.js";
import {
  addContactSchema,
  updateContactSchema,
} from "../validation-schemas/contacts-schemas.js";

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  const newContact = await contactsService.addContact(req.body);
  if (!newContact) return res.status(404).json(newContact);
  res.status(201).json(newContact);
};

// const addNewContact = async (req, res, next) => {
//   const { name, email, phone } = req.body;

//   try {
//     const result = await contactsService.addContact({ name, email, phone });

//     if (!result) {
//       throw HttpError(400, "Not Found");
//     }

//     res.status(201).json(result);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
    contactId,
    req.body
  );

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

// const deleteContactById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const deletedContact = await contactsService.removeContact(contactId);
//   if (!deletedContact) {
//     throw HttpError(404, "Not found");
//   }

//   res.json({ message: "Contact deleted" });
// };

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsService.removeContact(contactId);
    if (!deletedContact) return res.status(404).json({ message: "Not found" });
    res.status(200).json(deletedContact);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addNewContact: controllerWrapper(addNewContact),
  updateContactById: controllerWrapper(updateContactById),
  deleteContactById: controllerWrapper(deleteContactById),
};
