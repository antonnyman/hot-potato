const url = require('url');
const http = require('http');
const qs = require('querystring');
const dir = process.cwd();
const fs = require('fs');
const { join, resolve } = require('path');
const chokidar = require('chokidar');
const nowDir = resolve(`${dir}/now.json`);
const lambdas = {};

function requireUncached(pkg) {
  delete require.cache[require.resolve(pkg)];
  return require(pkg);
}

function runner(port = 3000, watch = false) {
  if (!fs.existsSync(nowDir))
    console.log('now.json is required') || process.exit(0);
  if (watch)
    chokidar
      .watch(dir, {
        ignored: ['**/node_modules', '**/.git'],
        persistent: true,
      })
      .on('change', path => {
        console.log(`File ${path} has been changed`);
        resetLambdas();
      });

  executeServer(port);
}

const resetLambdas = () =>
  Object.keys(lambdas).forEach(key => delete lambdas[key]);

async function executeServer(port = 3000) {
  const { routes } = require(nowDir);

  const server = http.createServer(async (req, res) => {
    const { pathname, href, query } = url.parse(req.url);
    const params = qs.parse(query);
    const route = routes.find(route => {
      const method = route.methods || ['GET'];
      if (!method.includes(req.method)) return false;
      return pathname.match(route.src);
    });

    if (!route) return notFound(res);

    const [path, fileType] = route.dest.split('.');
    const rex = new RegExp(route.src.replace(/\//gim, '\\/'), 'gmi');
    const { groups } = rex.exec(pathname) || {};
    const q = Object.assign({}, params, groups);
    req.url = `${href.split('?')[0]}?${qs.stringify(q)}`;

    if (!lambdas[path]) {
      const lambda = resolve(join(dir, route.dest));

      if (fileType === 'html') {
        fs.readFile(lambda, function(error, content) {
          if (error && error.code === 'ENOENT') {
            notFound(res, route.dest);
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        if (fs.existsSync(lambda)) lambdas[path] = requireUncached(lambda);

        let fn = lambdas[path];
        if (typeof fn === 'object') {
          fn = lambdas[path].default;
        }

        console.log('Path of request: ', path);

        if (!fn) return notFound(res);

        await fn(req, res);
      }
    }
  });

  server.listen(port, () =>
    console.log(`> Local server running at port ${port}`)
  );
}

function notFound(res, file) {
  res.writeHead(200);
  res.end(
    `<h1>File doesn't exist</h1><p>File <code>${file}<code> doesn't exist.</p>`
  );
}

module.exports = runner;
