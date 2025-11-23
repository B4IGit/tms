const mongoose = require("mongoose");
const { Project } = require("../src/models/project");
const { Task } = require("../src/models/task");

const connectionString =
  "mongodb+srv://gms_user:HiJETfd7H7GdUbwF@bellevueuniversity.qxxmbuj.mongodb.net/?appName=BellevueUniversity";
const dbName = "TMS-DATABASE";

async function connectToDatabase() {
  await mongoose.connect(connectionString, { dbName });
  console.log("Connection to the database instance was successful");
}

const sampleProjects = [
  {
    projectId: 1000,
    name: "Project Alpha",
    description: "Initial phase of the project",
    startDate: new Date("2021-01-01T00:00:00.000Z"),
    endDate: new Date("2021-06-01T00:00:00.000Z"),
    dateCreated: new Date("2021-01-01T00:00:00.000Z"),
    dateModified: new Date("2021-01-05T00:00:00.000Z"),
  },
  {
    projectId: 2000,
    name: "Project Beta",
    description: "Second phase of the project",
    startDate: new Date("2021-01-01T00:00:00.000Z"),
    endDate: new Date("2021-06-01T00:00:00.000Z"),
    dateCreated: new Date("2021-01-01T00:00:00.000Z"),
    dateModified: new Date("2021-01-05T00:00:00.000Z"),
  },
];

const sampleTasks = [
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

async function createSampleData() {
  try {
    await connectToDatabase();

    await Task.deleteMany({});
    await Project.deleteMany({});

    const projects = await Project.insertMany(sampleProjects);
    console.log(`Inserted ${projects.length} projects`);

    const allowedProjectIds = new Set(projects.map((p) => p.projectId));
    const filteredTasks = sampleTasks.filter((t) =>
      allowedProjectIds.has(t.projectId)
    );

    const tasks = await Task.insertMany(filteredTasks);
    console.log(`Inserted ${tasks.length} tasks`);
  } catch (err) {
    console.error("Error creating sample data", err);
  } finally {
    await mongoose.connection.close();
  }
}

createSampleData();
