const crawlTomato = async (title: string) => {
  const URL = `https://www.rottentomatoes.com/search?`;
  const formattedTitle = title.replaceAll(/[: ]/g, "");
  const params = {
    search: formattedTitle,
  };
  const queryParams = new URLSearchParams(params).toString();
  const res = await fetch(`${URL}${queryParams}`);

  if (!res.ok) {
    throw new Error(`${res.status}, tomatoCrawler`);
  }

  const body = await res.text();
  const ratingIndex = body.indexOf("tomatometerscore");
  const rating = body.slice(ratingIndex + 18, ratingIndex + 20);
  console.log(rating);
  return /^(100|[1-9]?[0-9])$/.test(rating) ? rating + "% (신선도)" : "";
};

export default crawlTomato;
