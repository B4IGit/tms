const request = require("supertest");
const app = require("../../../src/app");
const { Project } = require("../../../src/models/project");

jest.mock("../../../src/models/project"); // Mock the Project model

describe("Project API", () => {
  describe("GET /api/tasks", () => {
    it("should get all projects", async () => {
      Project.find.mockResolvedValue([{ name: "Make List" }]); // Mock the find method
      const response = await request(app).get("/api/projects");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
    it("should handel errors", async () => {
      Project.find.mockRejectedValue(new Error("Database error")); // Mock an error
      const response = await request(app).get("/api/projects");
      expect(response.status).toBe(500);
    });
    it("handel an empty db", async () => {
      Project.find.mockResolvedValue([]); // Mock the find method
      const response = await request(app).get("/api/projects");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
