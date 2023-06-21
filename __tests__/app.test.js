const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");

afterAll(() => {
  return db.end();
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
          snack_name: "Kit Kat",
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

// test for DELETE /api/snacks/:id

// describe.skip("POST /api/snacks", () => {
//   test("201: responds with the newly created snack object", () => {
//     const requestBody = {
//       snack_name: "love hearts",
//       snack_description: "lovingly made in New Mills",
//       category_id: 7,
//     };
//     return request(app)
//       .post("/api/snacks")
//       .send(requestBody)
//       .expect(201)
//       .then(({ body }) => {
//         expect(body.snack).toEqual({
//           snack_id: 7,
//           ...requestBody,
//         });
//       });
//   });
// });
