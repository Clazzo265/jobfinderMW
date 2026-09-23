import dotenv from "dotenv";

dotenv.config();

const { default: app } = await import("./app.js");

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🇲🇼 JobFinder MW API running on port ${PORT}`
  );
});