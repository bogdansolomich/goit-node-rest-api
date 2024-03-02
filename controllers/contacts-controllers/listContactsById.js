import Contact from "../../models/Contacts.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const listContactsById = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }

  const contacts = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  const total = await Contact.countDocuments(filter);

  res.json({
    contacts,
    total,
  });
};

export default ctrlWrapper(listContactsById);
