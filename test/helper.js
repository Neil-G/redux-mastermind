const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM('<!doctype html><html><body></body></html>')
const win = dom.window

global.document = dom.window.document
global.window = win

