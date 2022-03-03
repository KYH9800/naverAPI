const express = require('express');
const app = express();

const NAVER_CLIENT_ID = '517uU89Qf9EcWEcI8Ad4';
const NAVER_CLIENT_SECRET = '4JTYNsOKDa';

// express에 적용하기 위한 참고 사이트
//* https://handhand.tistory.com/36

// 카테고리: 정치, 경제, 사회, 생활/문화, IT/과학, 세계
// 결과 확인: http://127.0.0.1:3000/search/news
app.get('/search/news', (req, res) => {
  const request = require('request');
  const api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI('IT/과학'); // req.query.query, json 결과

  const options = {
    url: api_url,
    headers: { 'X-Naver-Client-Id': NAVER_CLIENT_ID, 'X-Naver-Client-Secret': NAVER_CLIENT_SECRET },
  };

  request.get(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
      console.log(JSON.parse(body));
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

app.get('/', (req, res) => {
  res.send('hello express in naverAPI');
});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000/search/news?query=검색어 app listening on port 3000!');
});

/*
const request = require('request')

const NAVER_CLIENT_ID     = '본인의 Client ID'
const NAVER_CLIENT_SECRET = '본인의 Client Secret'

const option = {
  query  :'꽃', //이미지 검색 텍스트
  start  :1, //검색 시작 위치
  display:3, //가져올 이미지 갯수
  sort   :'sim', //정렬 유형 (sim:유사도)
  filter :'small' //이미지 사이즈
}

request.get({
  uri:'https://openapi.naver.com/v1/search/image', //xml 요청 주소는 https://openapi.naver.com/v1/search/image.xml
  qs :option,
  headers:{
    'X-Naver-Client-Id':NAVER_CLIENT_ID,
    'X-Naver-Client-Secret':NAVER_CLIENT_SECRET
  }
}, function(err, res, body) {
  let json = JSON.parse(body) //json으로 파싱
  console.log(json)
})
*/
