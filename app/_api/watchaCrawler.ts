const crawlWatcha = async (title: string) => {
  const href = await getWatchaUrl(title);
  const rating = await getWatchaRating(href);
  return rating;
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

// 상세페이지 주소에서 평점 찾기
export const getWatchaRating = async (href: string | null) => {
  if (href?.includes("ml>")) return "";

  const res = await fetch(`https://pedia.watcha.com/ko-KR/contents/${href}`);
  const body = await res.text();
  const ratingIndex = body.indexOf("ratingValue");
  const rating = body.slice(ratingIndex + 14, ratingIndex + 17);

  return rating + " / 5.0";
};

export default crawlWatcha;
