const test = require('node:test');
const assert = require('node:assert/strict');
test('server package exposes a health endpoint implementation', async () => {
  const fs = require('node:fs');
  const source = fs.readFileSync(require.resolve('./server.js'),'utf8');
  assert.match(source, /\/health/);
  assert.match(source, /WebSocketServer/);
  assert.match(source, /type === 'message'/);
});
