import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const allowedSubscriptions = ["starter", "pro", "business"];
  if (!allowedSubscriptions.includes(subscription)) {
    throw HttpError(400, "Invalid subscription type");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { subscription },
    { new: true }
  );
  res.json(user);
};

export default ctrlWrapper(updateSubscription);
