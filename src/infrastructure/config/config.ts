const throwRequired = (propName: string): never => {
  throw new Error(`Config property ${propName} is required`);
};

export default {
  nodeEnv: process.env.NODE_ENV ?? throwRequired('NODE_ENV'),
  host: process.env.HOST ?? throwRequired('HOST'),
  restPort: process.env.REST_PORT ?? throwRequired('REST_PORT'),
  postgres: {
    db: process.env.POSTGRES_DB ?? throwRequired('POSTGRES_DB'),
    host: process.env.POSTGRES_HOST ?? throwRequired('POSTGRES_HOST'),
    port: process.env.POSTGRES_PORT ?? throwRequired('POSTGRES_PORT'),
    user: process.env.POSTGRES_USER ?? throwRequired('POSTGRES_USER'),
    password: process.env.POSTGRES_PASSWORD ?? throwRequired('POSTGRES_PASSWORD'),
  },
} as const;
