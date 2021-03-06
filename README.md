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

```javascript
[ { type: 'comment', matches: [] },
  { type: 'definition', matches: [ 'Name', 'Test' ] },
  { type: 'definition', matches: [ 'Author', '"Joachim Schirrmacher"' ] }
]
```

As you see, you don't only get the three recognised tokens, but also the matches that are found. This makes it
easy to handle a lot without defining separate tokens but instead use patterns (like in 'definition').

## Updating from version 1.0.x

In previous versions, tokeniser returned the unfiltered result from `String.match()`, which contains an `input` and an `index` attribute as well as the whole match.
These elements are stripped in version beginning at 1.1.0, so if you need this side-effect, be sure to modify your code.
