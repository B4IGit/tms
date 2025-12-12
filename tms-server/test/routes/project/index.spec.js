/*const request = require("supertest");
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
      const response = await request(app).get("/api/projects/");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("get project by id successfully", () => {
    it("should return 200", async () => {
      Project.prototype.save.mockResolvedValue({
        _id: "650c1f1e1c9d440000a1b1c1",
      });

      const response = await request(app).post("/api/projects/1").send({
        projectId: 1000,
        name: "Project Alpha",
        description: "Initial phase of the project",
        startDate: "2021-01-01T00:00:00.000Z",
        endDate: "2021-06-01T00:00:00.000Z",
      });
      expect(response.status).toBe(200);
    });
  });
});*/

const request = require("supertest");
const app = require("../../../src/app");
const { Project } = require("../../../src/models/project");

jest.mock("../../../src/models/project");

describe("Project API", () => {
// GET ALL PROJECTS
  describe("GET /api/projects", () => {
    it("should get all projects", async () => {
      Project.find.mockResolvedValue([{ name: "Make List" }]);

      const response = await request(app).get("/api/projects");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should handle errors", async () => {
      Project.find.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/projects");

      expect(response.status).toBe(500);
    });

    it("should return an empty array when no projects exist", async () => {
      Project.find.mockResolvedValue([]);

      const response = await request(app).get("/api/projects");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  //  GET PROJECT BY ID 
  describe("GET /api/projects/:id", () => {
    it("should return 200 and the project", async () => {
      Project.findById.mockResolvedValue({
        _id: "650c1f1e1c9d440000a1b1c1",
        name: "Project Alpha",
      });

      const response = await request(app).get(
        "/api/projects/650c1f1e1c9d440000a1b1c1"
      );

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Project Alpha");
    });

    it("should return 404 if project not found", async () => {
      Project.findById.mockResolvedValue(null);

      const response = await request(app).get(
        "/api/projects/650c1f1e1c9d440000a1b1c1"
      );

      expect(response.status).toBe(404);
    });

    it("should handle DB errors", async () => {
      Project.findById.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get(
        "/api/projects/650c1f1e1c9d440000a1b1c1"
      );

      expect(response.status).toBe(500);
    });
  });

});

