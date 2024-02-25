import { controllerWrapper } from "../decorators/controllerWrapper.js";
import contactsService from "../services/contacts.js";

const getAllContacts = controllerWrapper(async (req, res, next) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
});

const getContactById = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);

  res.json(contact);
});

const addNewContact = controllerWrapper(async (req, res, next) => {
  const newContact = await contactsService.addContact(req.body);

  res.status(201).json(newContact);
});

const updateContactById = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
    contactId,
    req.body
  );

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
});

// const updateContactById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const updatedContact = await contactsService.updateContact(
//     contactId,
//     req.body
//   );

//   if (!updatedContact) {
//     throw HttpError(404, "Not found");
//   }

//   res.json(updatedContact);
// };

const deleteContactById = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contactsService.getContactById(contactId);
  await contactsService.removeContact(contactId);

  res.json(deletedContact);
});

export default {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContactById,
  deleteContactById,
};
