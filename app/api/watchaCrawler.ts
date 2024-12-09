import puppeteer from "puppeteer";
import getClientPromise from "../lib/db";

const crawlWatcha = async (title: string) => {
  const href = await getWatchaUrl(title);
  const rating = await getWatchaRating(href);
  const still = await getWatchaStill(title, href);
  return { still, rating };
};

// 왓챠에서 이름으로 상세페이지 주소 찾기
export const getWatchaUrl = async (title: string) => {
  const params = {
    query: title.replaceAll(" ", ""),
  };
  const queryParams = new URLSearchParams(params).toString();
  const URL = `https://pedia.watcha.com/ko-KR/search?${queryParams}`;
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error(`${res.status}, getWatchaUrl`);
  }

  const body = await res.text();
  const hrefIndex = body.indexOf("/ko-KR/contents/");
  const href = body.slice(hrefIndex + 16, hrefIndex + 23);

  return href;
};

const getStillFromDB = async (title: string): Promise<string | null> => {
  const dbName = "what-movie";
  const collectionName = "stills";
  try {
    const client = await getClientPromise;
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const document = await collection.findOne({ title });
    return document ? document.imageUrl : null;
  } catch (error) {
    console.error("Error fetching from the database:", error);
    return null;
  }
};

const saveStillToDB = async (title: string, imageUrl: string) => {
  const dbName = "what-movie";
  const collectionName = "stills";
  try {
    const client = await getClientPromise;
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    await collection.updateOne(
      { title },
      { $set: { title, imageUrl, createdAt: new Date() } },
      { upsert: true }
    );
  } catch (error) {
    console.error("Error saving to the database:", error);
  }
};

// 상세페이지 주소에서 이미지 찾기
export const getWatchaStill = async (title: string, href: string) => {
  if (href?.includes("ml>")) return "";

  const cachedImageUrl = await getStillFromDB(title);
  if (cachedImageUrl) {
    return cachedImageUrl;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--ignore-certificate-errors"],
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on("request", request => {
    const resourceType = request.resourceType();
    if (["image", "stylesheet", "font"].includes(resourceType)) {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto(`https://pedia.watcha.com/ko-KR/contents/${href}`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  const body = await page.evaluate(() => document.body.innerHTML);

  const urlPattern = /background-image:\s*url\((.*?)\)/;
  const urlMatch = body.match(urlPattern);
  const imageUrl = urlMatch ? urlMatch[1] : "";

  await browser.close();

  if (imageUrl) {
    await saveStillToDB(title, imageUrl);
  }

  return imageUrl;
};

// 상세페이지 주소에서 평점 찾기
export const getWatchaRating = async (href: string) => {
  if (href?.includes("ml>")) return "";

  const URL = `https://pedia.watcha.com/ko-KR/contents/${href}`;
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error(`${res.status}, getWatchaRating`);
  }

  const pageBody = await res.text();
  const ratingIndex = pageBody.indexOf("ratingValue");
  const rating = pageBody.slice(ratingIndex + 14, ratingIndex + 17);
  const validRating = /^(?:[0-4]\.[0-9]|5\.0)$/.test(rating)
    ? rating + " / 5.0"
    : "";

  return validRating;
};

export default crawlWatcha;
