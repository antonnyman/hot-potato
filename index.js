const { parse } = require('url');

module.exports = async function(req, res) {
  try {
    const { pathname = '/', query = {} } = parse(req.url, true);
    const { type, code, username } = query;

    function headers(data) {
      res.statusCode = 200;
      res.setHeader('Content-Type', `text/json`);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.end(data);
    }

    console.log(pathname);

    if (pathname === '/new') {
      const data = await createLobby(username);
      headers(data);
    } else if (pathname === '/join') {
      const data = await joinLobby(code, username);
      headers(data);
    } else {
      headers(JSON.stringify({ ok: 'up' }));
    }
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', `text/json`);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.end({ response: 'There was an issue...' });
    console.error(e.message);
  }
};
