/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "openhealth",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "ap-southeast-2", // Sydney region
        },
      },
    };
  },
  async run() {
    // Central API Lambda
    const centralApi = new sst.aws.Function("CentralApi", {
      handler: "phase_1/central_api/dist/lambda.handler",
      runtime: "nodejs20.x",
      environment: {
        NODE_ENV: "production",
      },
      url: {
        cors: true
      },
    });

    // DHB API Lambda  
    const dhbApi = new sst.aws.Function("DhbApi", {
      handler: "phase_1/DHB/dist/lambda.handler", 
      runtime: "nodejs20.x",
      environment: {
        NODE_ENV: "production",
      },
      url: true,
    });

    // Toniq API Lambda
    const toniqApi = new sst.aws.Function("ToniqApi", {
      handler: "phase_1/Toniq/dist/lambda.handler",
      runtime: "nodejs20.x", 
      environment: {
        NODE_ENV: "production",
      },
      url: true,
    });

    // Frontend hosting
    const frontend = new sst.aws.StaticSite("Frontend", {
      path: "phase_1/frontend",
      build: {
        command: "./build.sh",
        output: "dist",
      },
    });

    return {
      centralApi: centralApi.url,
      dhbApi: dhbApi.url, 
      toniqApi: toniqApi.url,
      frontend: frontend.url,
    };
  },
});