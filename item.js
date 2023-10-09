const ExpressError = require("./expressError");
const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }

  static findAll() {
    return items;
  }

  static findItem(name) {
    const item = items.find((item) => item.name === name);
    if (item === undefined) {
      throw new ExpressError("Item is not defined", 404);
    }
    return item;
  }

  static update(name, data) {
    let foundItem = this.findItem(name);
    if (foundItem === undefined) {
      throw new ExpressError("Item is not defined", 404);
    }

    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }

  static delete(name) {
    let foundIndex = items.findIndex((item) => {
      return item.name === name;
    });
    if (foundIndex === -1) {
      throw new ExpressError("No Item found", 404);
    }
    items.splice(foundIndex, 1);
  }
}

module.exports = Item;
