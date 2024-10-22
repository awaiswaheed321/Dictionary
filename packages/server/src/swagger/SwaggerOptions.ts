const SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dictionary API",
      version: "1.0.0",
      description: "API documentation for the Dictionary project",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: {
      schemas: {
        Entry: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Unique identifier for the word",
            },
            word: {
              type: "string",
              description: "The word itself",
            },
            wordType: {
              type: "string",
              description: "The type of the word (e.g., noun, verb)",
            },
            definition: {
              type: "string",
              description: "The word’s definition",
            },
          },
        },
        Count: {
          type: "object",
          properties: {
            word: {
              $ref: "#/components/schemas/Entry",
              description: "The word object",
            },
            count: {
              type: "integer",
              description:
                "The count of how many times the word has been searched",
            },
          },
        },
      },
    },
  },
  apis: ["./src/route/*.ts"],
};

export default SwaggerOptions;
