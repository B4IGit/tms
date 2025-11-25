/**
 * Author: Sara King
 * Date: 24 November 2025
 * File: index.spec.js
 * Description: Test file for the routes.
 */

const request = require("supertest");
const express = require("express");
const app = require("../../src/app");

describe("GET api/tasks", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
  });
});
