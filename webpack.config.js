const path = require("path");
// import path from "path" 와 같은 의미
// webpack.config.js 는 모던 자바스크립트 파일이 아니라서, import 사용 불가
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.*(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        // 적용할 파일의 패턴
        test: /\.(scss)$/,
        // 적용할 로더
        use: ExtractCSS.extract([
          // 순서 밑에서 위로
          {
            loader: "css-loader" // webpack이 css를 이해하게된다
          },
          {
            loader: "postcss-loader", // css 호환성 문제 해결 (ex. 접두사)
            options: {
              plugins: function() {
                return [
                  autoprefixer({
                    browsers: "cover 99.5%"
                  })
                ];
              }
            }
          },
          {
            loader: "sass-loader" // scss -> css
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    // filename: "main"
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
