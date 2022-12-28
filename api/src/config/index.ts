import * as dotenv from "dotenv"
dotenv.config();

export const dev = {
  app: {
    serverPort: Number(process.env.SERVER_PORT) || 4002,
    jwtSecretKey: String(process.env.JWT_SECRET_KEY) || "assdfghjkltre34567890#+ysdfghjkl",
    smtpUsername: process.env.SMTP_EMAIL,
    smtpPassword: process.env.SMTP_PASSWORD,
    clientUrl: process.env.CLIENT_URL
  },
  db: {
    mongoUrl: process.env.MONGO_URL || "",
  },
}
