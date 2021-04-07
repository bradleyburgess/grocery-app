import express from "express";
import checkToken from "../../utils/checkToken";
import getItems from "./getItems";
import addItems from "./addItems";
import updateItems from "./updateItems";
import deleteItems from "./deleteItems";

const router = express.Router();

// @route     /api/items
// @method    GET
// @access    protected
// @function  gets grocery items with lists
router.get("/", checkToken, getItems);

// @route     /api/items/add
// @method    POST
// @access    protected
// @function  adds new grocery item
router.post("/add", checkToken, addItems);

// @route     /api/items/update
// @method    POST
// @access    protected
// @function  updates grocery item
router.post("/update", checkToken, updateItems);

// @route     /api/items/delete
// @method    POST
// @access    protected
// @function  updates grocery item
router.post("/delete", checkToken, deleteItems);

export default router;
