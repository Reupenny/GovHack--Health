import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

// Dedicated OPTIONS handler for CORS preflight
export const handler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  console.log('OPTIONS handler called:', JSON.stringify(event, null, 2));
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Requested-With',
      'Access-Control-Max-Age': '86400',
      'Content-Type': 'text/plain'
    },
    body: ''
  };
};