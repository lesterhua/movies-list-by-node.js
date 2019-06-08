// 引入express
const express = require("express");
const app = express();

//導入樣板引擎handlebars
const exphbs = require("express-handlebars");

//導入movies json
const allMovies = require("./movies.json");

//設定server
const port = 3000;

//設定handlebars引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//告知express設定view engine 是handlebars
app.set("view engine", "handlebars");

// 告知express，靜態檔案位置
app.use(express.static("public"));

//設定路由的index網址，回傳movies list資料
app.get("/", (req, res) => {
  res.render("index", { movie: allMovies.results });
});

//設定路由的search網址，回傳search bar 資料
app.get("/search", function(req, res) {
  console.log("keywords", req.query.keyword);
  const keyword = req.query.keyword;
  const input = allMovies.results.filter(function(movie) {
    return movie.title.toLowerCase().includes(keyword.toLowerCase());
  });
  res.render("index", { movie: input, keywords: keyword });
});

//設定params網址動態隕料
app.get("/movie/:movie_id", function(req, res) {
  console.log("req.params:", req.params.movie_id);
  const movieId = allMovies.results.find(function(movie) {
    return movie.id.toString() === req.params.movie_id;
  });
  res.render("show", { movie: movieId });
});

//監聽啟動網址
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}/`);
});
