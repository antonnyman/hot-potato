export function response(res: any, data: any) {
  res.statusCode = 200;
  res.setHeader('Content-Type', `text/json`);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.end(data);
  return res;
}

export function error(res: any, e: any) {
  res.statusCode = 500;
  res.setHeader('Content-Type', `text/json`);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.end({ response: 'There was an issue...' });
  console.log(e.message);
  return res;
}
