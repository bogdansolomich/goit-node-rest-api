import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const signout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

export default ctrlWrapper(signout);
