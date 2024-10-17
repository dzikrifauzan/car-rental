const request = require("supertest");
const server = require("../index");

const testUser = {
  email: "test@test.com",
  password: "Test123!",
};

describe("POST /api/v1/auth/signup", () => {
  it("should respond with 200 status code", (done) => {
    request(server)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            code: 200,
            status: "success",
            message: "Sign up successfully",
            data: expect.objectContaining({
              user: {
                email: "test@test.com",
                password: expect.not.stringContaining("Test123!"),
                address: null,
                avatar: null,
                birthdate: null,
                driver_license: null,
                fullname: null,
                gender: null,
                phone_number: null,
                roleId: 3,
                createdBy: null,
                createdDt: expect.any(String),
                updatedBy: null,
                updatedDt: expect.any(String),
              },
            }),
          })
        );
        done();
      })
      .catch((e) => {
        console.log(e);
        done();
      });
  });
});

describe("POST /api/v1/auth/signin", () => {
  it("should respond with 200 status code and return user data", (done) => {
    request(server)
      .post("/api/v1/auth/signin")
      .send(testUser)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            code: 200,
            status: "success",
            message: "Sign in successfully",
            data: expect.objectContaining({
              token: expect.any(String),
              user: {
                email: "test@test.com",
                address: null,
                avatar: null,
                birthdate: null,
                driver_license: null,
                fullname: null,
                gender: null,
                phone_number: null,
                roleId: 3,
                createdBy: null,
                createdDt: expect.any(String),
                updatedBy: null,
                updatedDt: expect.any(String),
              },
            }),
          })
        );
        done();
      })
      .catch((e) => {
        console.error(e);
        done();
      });
  });
});
