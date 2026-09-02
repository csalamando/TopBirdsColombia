const { setWorldConstructor, BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
const { spawn } = require("child_process");
const http = require("http");
const path = require("path");

const BASE_URL = "http://localhost:5173";
const API_URL = "http://localhost:8000";

class CustomWorld {
  constructor() {
    this.baseURL = BASE_URL;
    this.apiURL = API_URL;
  }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(20000);

let browser;
let backendProcess;
let frontendProcess;

function waitForURL(url, timeout = 60_000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    function check() {
      http
        .get(url, (res) => {
          if (res.statusCode && res.statusCode < 500) {
            res.resume();
            resolve();
          } else {
            res.resume();
            retry();
          }
        })
        .on("error", retry);
    }
    function retry() {
      if (Date.now() - start > timeout) {
        reject(new Error(`Timeout waiting for ${url}`));
      } else {
        setTimeout(check, 500);
      }
    }
    check();
  });
}

BeforeAll(async function () {
  backendProcess = spawn("python", ["-m", "uvicorn", "app.main:app", "--port", "8000"], {
    cwd: path.resolve(__dirname, "../../src/backend"),
    shell: true,
    stdio: "ignore",
  });
  await waitForURL(`${API_URL}/health`, 60_000);

  frontendProcess = spawn("npm", ["run", "dev"], {
    cwd: path.resolve(__dirname, "../../src/frontend"),
    shell: true,
    stdio: "ignore",
  });
  await waitForURL(BASE_URL, 120_000);

  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  if (browser) await browser.close();
  if (frontendProcess) frontendProcess.kill();
  if (backendProcess) backendProcess.kill();
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.context.close();
});
