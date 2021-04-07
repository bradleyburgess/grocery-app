import express from "express";
import checkToken from "../../utils/checkToken";
import addList from "./addList";
import deleteList from "./deleteList";
import getLists from "./getLists";

const router = express.Router();

// @route     /api/lists
// @method    GET
// @access    protected
// @function  creates a new grocery list
router.get("/", checkToken, getLists);

// @route     /api/lists/add
// @method    POST
// @access    protected
// @function  creates a new grocery list
router.post("/add", checkToken, addList);

// @route     /api/lists/delete
// @method    POST
// @access    protected
// @function  deletes a list with all items
router.post("/delete", checkToken, deleteList);

export default router;
