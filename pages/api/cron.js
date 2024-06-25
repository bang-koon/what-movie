import fetch from "node-fetch";

export default async function handler(req, res) {
  const deployHookUrl = process.env.DEPLOY_HOOK_URL;

  if (!deployHookUrl) {
    return res.status(500).end("Deploy hook URL is not defined.");
  }

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
