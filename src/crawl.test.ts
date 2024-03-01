// import { getURLsFromHTML } from './crawl';
// const {test, expect} = require('@jest/globals');
const {normalizeURL, getURLsFromHTML} = require('./crawl');
const expected = 'blog.boot.dev/path';

test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL http', () => {
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
  })

  test('getURLsFromHTML absolute', () =>{
    const inputHTMLBody = `
      <html>
        <body>
          <a href='https://blog.boot.dev/'>
            Boot.dev Blog
          </a>
        </body>
      </html>
    `;
    const expected = ['https://blog.boot.dev/'];
    const inputBaseURL = 'https://blog.boot.dev';
    const current = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    expect(current).toEqual(expected);
  })

  test('getURLsFromHTML relative', () =>{
    const inputHTMLBody = `
      <html>
        <body>
          <a href='/path/'>
            Boot.dev Blog
          </a>
        </body>
      </html>
    `;
    const expected = ['https://blog.boot.dev/path/'];
    const inputBaseURL = 'https://blog.boot.dev';
    const current = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    expect(current).toEqual(expected);
  })

  test('invalid', () =>{
    const inputHTMLBody = `
      <html>
        <body>
          <a href='invalid'>
            Boot.dev Blog
          </a>
        </body>
      </html>
    `;
    const expected: string[] = [];
    const inputBaseURL = 'https://blog.boot.dev';
    const current = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    expect(current).toEqual(expected);
  })