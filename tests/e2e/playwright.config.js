const path = require("path");

module.exports = {
  testDir: __dirname,
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    screenshot: "only-on-failure",
  },
  webServer: [
    {
      command: "python -m uvicorn app.main:app --port 8000",
      cwd: path.resolve(__dirname, "../../src/backend"),
      url: "http://localhost:8000/health",
      timeout: 60_000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev",
      cwd: path.resolve(__dirname, "../../src/frontend"),
      url: "http://localhost:5173",
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
};
