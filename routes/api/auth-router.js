import express from "express";
import { authController } from "../../controllers/auth-controllers/index.js";
import { authenticate, isEmtyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmtyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmtyBody,
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.patch("/", authenticate, authController.updateSubscription);

export default authRouter;
