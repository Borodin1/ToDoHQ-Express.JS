const appConfig = {
  host: process.env.PORT ? "0.0.0.0" : "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT) : 1337,
};

export default appConfig;
