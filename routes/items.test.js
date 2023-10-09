process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

let item = { name: "Oats", price: 1.8 };

beforeEach(function () {
  items.push(item);
});

afterEach(function () {
  items = [];
});

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const response = await request(app).get(`/items`);
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});

describe("POST/items", function () {
  test("Add Item to shopping list", async function () {
    let newItem = { name: "snickers", price: 1.5 };
    const response = await request(app).post("/items").send(newItem);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("snickers");
    expect(response.body.item.price).toEqual(1.5);
  });
});

describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if Item is not defines", async function () {
    const response = await request(app).get(`/items/bjbbiuybg`);
    expect(response.statusCode).toBe(404);
  });
});

describe("PATCH /items/:name", () => {
  test("Update Item", async function () {
    const updateData = { name: "Oatly", price: 2.5 };
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({ name: "Oatly" });

    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({ name: "Oatly" });
  });
});

describe("DELETE /items/:name", () => {
  test("Remove a item fromn list", async function () {
    const response = await request(app).delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});
