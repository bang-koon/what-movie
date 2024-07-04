import fetch from "node-fetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const deployHookUrl = process.env.DEPLOY_HOOK_URL;

  if (!deployHookUrl) {
    console.error("Deploy hook URL is not defined.");
    return new NextResponse("Deploy hook URL is not defined.", { status: 500 });
  }

  try {
    const deployResponse = await fetch(deployHookUrl, {
      method: "POST",
    });

    console.log(`Deploy hook called at ${new Date().toISOString()}`);

    if (deployResponse.ok) {
      return new NextResponse("Deploy triggered successfully!", {
        status: 200,
      });
    } else {
      return new NextResponse("Failed to trigger deploy.", {
        status: deployResponse.status,
      });
    }
  } catch (error: any) {
    console.error("Error triggering deploy:", error.message);
    return new NextResponse("Error triggering deploy: " + error.message, {
      status: 500,
    });
  }
}
