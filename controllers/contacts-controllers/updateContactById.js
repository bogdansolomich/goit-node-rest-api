import Contact from "../../models/Contacts.js";
import { HttpError } from "../../helpers/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const updateContactById = async (req, res) => {
  const { error } = contactUpdateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default ctrlWrapper(updateContactById);
