const Card = () => (
  <>
    <article>
      <div className="card-header">
        <p className="movie-title">제목</p>
      </div>
      <div className="card-poster">
        imgimgimgimgimgimg{/* img, alt 한글, 영어 이름 넣어주기 */}
      </div>
      <div className="card-contents">
        <p className="directors">감독:</p>
        <p className="actors">배우</p>
        <p className="watcha">왓챠: 3.4</p>
        <p className="tomato">리튼: 75%</p>
      </div>
    </article>
  </>
);
export default Card;
