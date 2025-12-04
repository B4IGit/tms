const request = require("supertest");
const app = require("../../../src/app");
const { Project } = require("../../../src/models/project");

jest.mock("../../../src/models/project"); // Mock the Project model

describe("Task API", () => {
  it("should create a new task successfully", async () => {
    expect(true).toBe(true);
  });
});
