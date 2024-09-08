export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  Jwt: {
    secret: process.env.JWT_SECRET,
  },
  MongoDb: {
    uri: process.env.MONGODB_URI,
  },
});
