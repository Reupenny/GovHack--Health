module.exports = {
  apps: [
    {
      name: "central-api",
      script: "./central_api/dist/index.js",
      cwd: "/app",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      instances: 1,
      exec_mode: "fork",
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: "10s",
    },
    {
      name: "dhb-api",
      script: "./DHB/dist/index.js",
      cwd: "/app",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        CENTRAL_API_URL: "http://localhost:3000",
      },
      instances: 1,
      exec_mode: "fork",
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: "10s",
    },
    {
      name: "frontend",
      script: "./frontend/node_modules/.bin/serve",
      args: "-s ./frontend/dist -l 3002",
      cwd: "/app",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "fork",
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: "10s",
    },
    {
      name: "toniq-api",
      script: "./Toniq/dist/index.js",
      cwd: "/app",
      env: {
        NODE_ENV: "production",
        PORT: 3003,
        CENTRAL_API_URL: "http://localhost:3000",
      },
      instances: 1,
      exec_mode: "fork",
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: "10s",
    },
  ],
}

