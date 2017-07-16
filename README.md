# tokeniser

## Why another tokenizer?

I needed a tokenizer and tried some of the existing, but they missed some features I needed:
- [node-tokenizer](https://www.npmjs.com/package/node-tokenizer) doesn't return information about the token types it finds, only the text.
- [tokenizer-array](https://www.npmjs.com/package/tokenizer-array) returns this information but has a strange way of finding tokens: it searches by bisecting the text, but this doesn't find all tokens, at least in my case.

Since the task of creating a tokenizer doesn't seems too hard, I decided to create an own one - here it is.

## Requirements

The only requirement is to use ES6. It makes code easier to read (in my opinion), you might need a translator (like [Babel](http://babeljs.io) if you want to use it in some browsers or with older Node versions (time to update?), but it is simply the future.

## Installation

```
npm i -S js-tokeniser
```

## Usage

```javascript
const tokeniser = require('js-tokeniser')

let result = tokeniser('// Test file\nName = Test\nAuthor = "Joachim Schirrmacher"',
  [
    {type: "comment", regex: /^\s*\/\/[^\n]*/},
    {type: "definition", regex: /^\s*(\w+)\s*=\s*((?:[^\n]+\\\n)*[^\n]+)/},
  ]
)
console.log(result)
```

prints the following output:

```
[ { type: 'comment',
    matches: 
     [ '// Test file',
       index: 0,
       input: '// Test file\nName = Test\nAuthor = "Joachim Schirrmacher"' ] },
  { type: 'definition',
    matches: 
     [ '\nName = Test',
       'Name',
       'Test',
       index: 0,
       input: '\nName = Test\nAuthor = "Joachim Schirrmacher"' ] },
  { type: 'definition',
    matches: 
     [ '\nAuthor = "Joachim Schirrmacher"',
       'Author',
       '"Joachim Schirrmacher"',
       index: 0,
       input: '\nAuthor = "Joachim Schirrmacher"' ] } ]
```
