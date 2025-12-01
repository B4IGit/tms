const request = require('supertest');
const app = require('../../../src/app');
const { Task } = require('../../../src/models/task');

jest.mock('../../../src/models/task'); // Mock the Task model

describe("Task API", () => {
    // POST
    describe("POST /api/tasks/taskId",  () => {
        it("should create a new task successfully", async () => {
            Task.prototype.save.mockResolvedValue({ _id: "650c1f1e1c9d440000a1b1c1" }); // Mock the save method

            const response = await request(app).post("/api/tasks/1").send({
                title: "Complete project documentation",
                description: "Write the documentation for the project",
                status: "In Progress",
                priority: "High",
                dueDate: "2021-01-10T00:00:00.000Z", // Ensure all required properties are included
            });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Task created successfully");
        });

        it("should return validation error for invalid status", async () => {
            const response = await request(app).post("/api/tasks/1").send({
                title: "Complete project documentation",
                description: "Write the documentation for the project",
                status: "Invalid status", // Invalid: not in enum
                priority: "High",
                dueDate: "2021-01-10T00:00:00.000Z",
                }
            );

            expect(response.status).toBe(400);
            const errorMessages = response.body.message

            expect(errorMessages).toContain("must be equal to one of the allowed values");
        })
    })
})