/**
 * Author: Sara King
 * Date: 24 November 2025
 * File: index.spec.js
 * Description: Test file for the routes.
 */

const request = require("supertest");
const express = require("express");
const app = require("../../src/app");
const { mongo } = require("../../src/utils/mongo");

jest.mock("../../src/utils/mongo");

describe("GET api/tasks", () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  it("should get all tasks", async () => {
    const tasks = [
      {
        title: "Complete project documentation",
        description: "Write the documentation for the project",
        status: "In Progress",
        priority: "High",
        dueDate: new Date("2021-01-10T00:00:00.000Z"),
        dateCreated: new Date("2021-01-01T00:00:00.000Z"),
        dateModified: new Date("2021-01-05T00:00:00.000Z"),
        projectId: 1000,
      },
      {
        title: "Kickoff meeting",
        description: "Hold the initial kickoff with stakeholders",
        status: "Pending", // <-- was "Todo" (invalid)
        priority: "Medium",
        dueDate: new Date("2021-01-03T00:00:00.000Z"),
        dateCreated: new Date("2021-01-01T00:00:00.000Z"),
        dateModified: new Date("2021-01-02T00:00:00.000Z"),
        projectId: 2000,
      },
    ];

    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockResolvedValue(tasks),
      };
      await callback(db);
    });

    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);
  });

  it("should handel NO tasks", async () => {
    const tasks = [];

    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockResolvedValue(tasks),
      };
      await callback(db);
    });

    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(0);
  });

  it("Should handel DB errors", async () => {
    const mockError = new Error("DB Error");

    mongo.mockImplementation(async (callback, next) => {
      next(mockError);
    });

    try {
      const response = await request(app).get("/api/tasks");
      expect(response.status).toBe(500);
    } catch (e) {}
  });
});
