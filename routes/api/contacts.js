import express from "express";
import { contactsController } from "../../controllers/contacts-controllers/index.js";
import {
  authenticate,
  isEmtyBody,
  isValidId,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../../models/Contacts.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.listContactsById);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmtyBody,
  validateBody(contactAddSchema),
  contactsController.addContactById
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  contactsController.removeContactById
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmtyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateContactById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmtyBody,
  validateBody(contactFavoriteSchema),
  contactsController.updateFavorite
);

export default contactsRouter;
