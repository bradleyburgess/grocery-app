import express from "express";
import { body } from "express-validator";
import checkRegistration from "../../utils/checkRegistration";
import registerUser from "./register";
import checkNewRegistrations from "./registrations";
import loginUser from "./login";

const router = express.Router();

// @route     /api/auth/register
// @method    POST
// @accesss   public
// @function  register a new user
router.post(
  "/register",
  checkRegistration,
  body("email").isEmail(),
  body("password").isStrongPassword(),
  registerUser
);

// @route     /api/auth/registrations
// @method    GET
// @accesss   public
// @function  checks if accepting new regsitrations
router.get("/registrations", checkNewRegistrations);

// @route     /api/auth/login
// @method    POST
// @accesss   public
// @function  login a user
router.post("/login", loginUser);

export default router;
