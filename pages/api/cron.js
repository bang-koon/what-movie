// pages/api/cron.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const deployHookUrl =
    "https://api.vercel.com/v1/integrations/deploy/prj_8mHgLHb935euutGQurmFhsYjB25r/5BjrVjLguh"; // 복사한 Deploy Hook URL 입력

  try {
    const response = await fetch(deployHookUrl, {
      method: "POST",
    });

    console.log(`Deploy hook called at ${new Date().toISOString()}`);

    if (response.ok) {
      res.status(200).end("Deploy triggered successfully!");
    } else {
      res.status(response.status).end("Failed to trigger deploy.");
    }
  } catch (error) {
    console.error("Error triggering deploy:", error.message);
    res.status(500).end("Error triggering deploy: " + error.message);
  }
}
