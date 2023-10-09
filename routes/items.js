const express = require("express");
const router = express.Router();
const Item = require("../item");
const ExpressError = require("../expressError");

/** GET */

router.get("", (req, res, next) => {
  let items = Item.findAll();
  debugger;
  if (items.length === 0) {
    throw new ExpressError("Shopping List is empty", 400);
  }

  try {
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
});

/** POST  */

router.post("", (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    console.log("item", newItem);
    return res.json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});

/** GET /[name] => item */

router.get("/:name", (req, res, next) => {
  try {
    let foundItem = Item.findItem(req.params.name);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
});

/** PATCH */
router.patch("/:name", (req, res, next) => {
  try {
    let updatedItem = Item.update(req.params.name, req.body);
    return res.json({ item: updatedItem });
  } catch (err) {
    return next(err);
  }
});

/** DELETE */
router.delete("/:name", (req, res, next) => {
  try {
    Item.delete(req.params.name);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
