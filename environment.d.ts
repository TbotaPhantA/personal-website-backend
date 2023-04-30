declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      HOST: string;
      REST_PORT: string;
      FRONT_URL: string;
      POSTGRES_DB: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      SALT_ROUNDS: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

export {}
