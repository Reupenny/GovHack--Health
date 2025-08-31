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
    // Create secret for Gemini API key
    const geminiApiKey = new sst.Secret("GeminiApiKey");

    // OPTIONS handler Lambda for CORS preflight
    const optionsHandler = new sst.aws.Function("OptionsHandler", {
      handler: "phase_1/central_api/dist/options.handler",
      runtime: "nodejs20.x",
      environment: {
        NODE_ENV: "production",
      },
    });

    // Central API Lambda
    const centralApi = new sst.aws.Function("CentralApi", {
      handler: "phase_1/central_api/dist/lambda.handler",
      runtime: "nodejs20.x",
      environment: {
        NODE_ENV: "production",
      },
    });

    // DHB API Lambda  
    const dhbApi = new sst.aws.Function("DhbApi", {
      handler: "phase_1/DHB/dist/lambda.handler", 
      runtime: "nodejs20.x",
      environment: {
        NODE_ENV: "production",
      },
    });

    // Toniq API Lambda
    const toniqApi = new sst.aws.Function("ToniqApi", {
      handler: "phase_1/Toniq/dist/lambda.handler",
      runtime: "nodejs20.x", 
      environment: {
        NODE_ENV: "production",
      },
    });

    // API Gateway without CORS - let Lambda handle all CORS
    const api = new sst.aws.ApiGatewayV2("OpenHealthApi");

    // Route all central API requests - use dedicated OPTIONS handler
    api.route("OPTIONS /central/register", optionsHandler.arn);
    api.route("OPTIONS /central/{proxy+}", optionsHandler.arn);
    api.route("OPTIONS /central", optionsHandler.arn);
    api.route("ANY /central/{proxy+}", centralApi.arn);
    api.route("ANY /central", centralApi.arn);
    
    // Route DHB API requests  
    api.route("ANY /dhb/{proxy+}", dhbApi.arn);
    api.route("ANY /dhb", dhbApi.arn);
    
    // Route Toniq API requests
    api.route("ANY /toniq/{proxy+}", toniqApi.arn);
    api.route("ANY /toniq", toniqApi.arn);

    // Frontend hosting with Gemini API key as environment variable
    const frontend = new sst.aws.StaticSite("Frontend", {
      path: "phase_1/frontend",
      build: {
        command: "./build.sh",
        output: "dist",
      },
      environment: {
        REACT_APP_GEMINI_API_KEY: geminiApiKey.value,
      },
    });

    return {
      api: api.url,
      centralApi: $interpolate`${api.url}/central`,
      dhbApi: $interpolate`${api.url}/dhb`, 
      toniqApi: $interpolate`${api.url}/toniq`,
      frontend: frontend.url,
    };
  },
});