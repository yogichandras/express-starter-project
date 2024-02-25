const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: '1.0.0',
        title: 'CORNERSTONE API',
        description: 'GUAM CORNERSTONE API',
        contact: {
            'name': 'API Support',
            'email': 'support@guamcornerstone.com'
        },
    },
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Auth",
            "description": "Auth API"
        },
        {
            "name": "User",
            "description": "User API"
        },
        {
            "name": "Role",
            "description": "Role API"
        }
    ],
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'JWT Bearer Token Authentication'
        }
    },
};

const outputFile = './swagger.json';
const endpointsFiles = ['../routes/auth.js', '../routes/role.js', '../routes/user.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);