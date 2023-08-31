const crawlTomato = async (title: string) => {
  const URL = `https://www.rottentomatoes.com/search?search=`;
  const queryParams = new URLSearchParams(title).toString();

  const res = await fetch(`${URL}${queryParams}`);

  if (!res.ok) {
    throw new Error(`${res.status}, tomatoCrawler`);
  }

  const body = await res.text();
  const ratingIndex = body.indexOf("tomatometerscore");
  const rating = body.slice(ratingIndex + 18, ratingIndex + 20);
  //   const numRating = `${rating.replaceAll(/[^0-9]/g, "")}`

  //   return numRating? numRating + '%': ''
  return /[0-9]/g.test(rating) ? rating + "%" : "";
};

export default crawlTomato;
