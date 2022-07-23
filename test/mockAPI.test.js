const json = require('../src/server/mockAPI')

test('get json object from test API', () => {
    expect(json.title).toBe('test json response')
    expect(json.message).toBe('this is a message')
    expect(json.time).toBe('now')
});