const appConfig = {
  host: process.env.APP_HOST || "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT) : 1337,
};

export default appConfig;
