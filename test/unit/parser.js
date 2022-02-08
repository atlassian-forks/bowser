import test from 'ava';
import sinon from 'sinon';
import Parser from '../../src/parser';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165';
const parser = new Parser(UA, true);

const EDGE_UA = 'Mozilla/5.0 (Linux; Android 8.0; Pixel XL Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.0 Mobile Safari/537.36 EdgA/41.1.35.1';
const edgeParser = new Parser(EDGE_UA, true);

const FOCUS_UA = 'Mozilla/5.0 (Linux; Android 7.1.1) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Focus/1.2.1 Chrome/59.0.3071.125';
const focusParser = new Parser(FOCUS_UA, true);

test('constructor', (t) => {
  t.truthy(parser instanceof Parser);
});

test('Parser.getUA returns a correct UA', (t) => {
  t.is(parser.getUA(), UA);
});

test('Parser.test', (t) => {
  t.truthy(parser.test(/Chrome/i));
});

test('Parser.parseBrowser is being called when the Parser.getBrowser() is called', (t) => {
  const spy = sinon.spy(parser, 'parseBrowser');
  const b = parser.getBrowser();
  t.truthy(spy.called);
  t.is(b.name, 'Opera');
  t.is(b.version, '43.0.2442.1165');
  parser.parseBrowser.restore();
});

test('Parser.getBrowserName returns a correct result', (t) => {
  t.is(parser.getBrowserName(), 'Opera');
});

test('Parser.getBrowserVersion returns a correct result', (t) => {
  t.is(parser.getBrowserVersion(), '43.0.2442.1165');
});

test('Skip parsing shouldn\'t parse', (t) => {
  t.deepEqual((new Parser(UA, true)).getResult(), {});
});

