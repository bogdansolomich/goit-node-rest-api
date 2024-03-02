import Contact from "../../models/Contacts.js";
import { HttpError } from "../../helpers/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const updateFavorite = async (req, res) => {
  const { error } = contactFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: req.body.favorite },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default ctrlWrapper(updateFavorite);
