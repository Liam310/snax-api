const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seed");
const data = require("../db/data");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("ALL non-existent path", () => {
  test("404: should return a custom error message when the path is not found", () => {
    return request(app)
      .get("/api/notapath")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("GET /api", () => {
  test("200: responds with an okay message", () => {
    return request(app) // arrange
      .get("/api") // act
      .expect(200) // assertion with supertest
      .then(({ body }) => {
        expect(body.msg).toBe("all okay!"); // assertion with jest
      });
  });
});

describe("GET /api/snacks/:id", () => {
  test("200: responds with an individual snack ", () => {
    return request(app) // arrange
      .get("/api/snacks/1") // act
      .expect(200) // assertion with supertest
      .then(({ body }) => {
        // destructure body
        expect(body.snack).toMatchObject({
          // jest assertion
          snack_id: 1,
          snack_name: "kit kat",
          snack_description: "time for a break",
          category_id: 3,
        });
      });
  });
  test("400: responds with an error when snack_id is an invalid type", () => {
    return request(app)
      .get("/api/snacks/nonsense")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("404: responds with an error when snack_id is valid, but does not exist", () => {
    return request(app)
      .get("/api/snacks/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("POST /api/snacks", () => {
  test("201: responds with the newly created snack object", () => {
    const requestBody = {
      snack_name: "love hearts",
      snack_description: "lovingly made in New Mills",
      category_id: 7,
    };
    return request(app)
      .post("/api/snacks")
      .send(requestBody)
      .expect(201)
      .then(({ body }) => {
        expect(body.snack).toEqual({
          snack_id: 14,
          ...requestBody,
        });
      });
  });
});

describe("GET /api/snacks", () => {
  test("200 responds with an array of all snacks", () => {
    return request(app)
      .get("/api/snacks")
      .expect(200)
      .then(({ body }) => {
        const { snacks } = body;
        expect(snacks).toHaveLength(13);
        snacks.forEach((snack) => {
          expect(snack).toHaveProperty("snack_id", expect.any(Number));
          expect(snack).toHaveProperty("snack_name", expect.any(String));
          expect(snack).toHaveProperty("snack_description", expect.any(String));
          expect(snack).toHaveProperty("category_id", expect.any(Number));
        });
      });
  });
  test("200: accepts a category_id query which responds with only snacks with that category_id ", () => {
    return request(app)
      .get("/api/snacks?category_id=2")
      .expect(200)
      .then(({ body }) => {
        const { snacks } = body;
        expect(snacks).toHaveLength(6);
        snacks.forEach((snack) => {
          expect(snack.category_id).toBe(2);
        });
      });
  });
  test("200: accepts a sort_by query which sorts by snack_name (ascending order by default)", () => {
    return request(app)
      .get("/api/snacks?sort_by=snack_name")
      .expect(200)
      .then(({ body }) => {
        const { snacks } = body;
        expect(snacks).toHaveLength(13);
        expect(snacks).toBeSortedBy("snack_name");
      });
  });
  test("200: responds with an empty array if the category exists but there are no snacks in that category", () => {
    return request(app)
      .get("/api/snacks?category_id=8")
      .expect(200)
      .then(({ body }) => {
        expect(body.snacks).toHaveLength(0);
      });
  });
  test("400: responds with bad request for an invalid category_id", () => {
    return request(app)
      .get("/api/snacks?category_id=banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: responds with bad request for an invalid sort_by", () => {
    return request(app)
      .get("/api/snacks?sort_by=banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("404: responds with not found if the category does not exist", () => {
    return request(app)
      .get("/api/snacks?category_id=10")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
