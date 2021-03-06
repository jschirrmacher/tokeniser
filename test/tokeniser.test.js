/*eslint-env mocha, node */
const should = require('should') // eslint-disable-line no-unused-vars
const tokeniser = require('../')
const rules = require('./rules')

describe('Tokeniser', () => {
    it('should recognise comments', done => {
        let result = tokeniser('// abc', rules)
        result.should.be.an.array
        result.length.should.equal(1)
        result[0].type.should.equal('comment')
        done()
    })

    it('should recognise definitions', done => {
        let result = tokeniser('Name = Test\nAuthor = "Joachim Schirrmacher"', rules)
        result[0].type.should.equal('definition')
        result[1].type.should.equal('definition')
        result[0].matches[0].should.equal('Name')
        result[0].matches[1].should.equal('Test')
        result[1].matches[0].should.equal('Author')
        result[1].matches[1].should.equal('"Joachim Schirrmacher"')
        done()
    })

    it('should recognise arrays', done => {
        let result = tokeniser('abc [\n\tx = 1\n]', rules)
        result.should.be.an.array
        result.length.should.equal(3)
        result[0].type.should.equal('arrayStart')
        result[0].matches[0].should.equal('abc')
        result[2].type.should.equal('arrayEnd')
        done()
    })

    it('should recognise objects', done => {
        let result = tokeniser('abc {\n\tx = 1\n}', rules)
        result.should.be.an.array
        result.length.should.equal(3)
        result[0].type.should.equal('objectStart')
        result[0].matches[0].should.equal('abc')
        result[2].type.should.equal('objectEnd')
        done()
    })

    it('should recognise objects in an array', done => {
        let result = tokeniser('Array[\n\t{\n\t}\n]', rules)
        result.length.should.equal(4)
        result[0].type.should.equal('arrayStart')
        result[1].type.should.equal('objectStart')
        result[2].type.should.equal('objectEnd')
        result[3].type.should.equal('arrayEnd')
        result[0].matches[0].should.equal('Array')
        result[1].matches[0].should.equal('')
        done()
    })

    it('should recognise arrays in an array', done => {
        let result = tokeniser('Array[\n\t[\n\t]\n]', rules)
        result.length.should.equal(4)
        result[0].type.should.equal('arrayStart')
        result[1].type.should.equal('arrayStart')
        result[2].type.should.equal('arrayEnd')
        result[3].type.should.equal('arrayEnd')
        result[0].matches[0].should.equal('Array')
        result[1].matches[0].should.equal('')
       done()
    })

    it('should recognise literals in an array', done => {
        let result = tokeniser('abc [1, 2, 3]', rules)
        result.should.be.an.array
        result.length.should.equal(3)
        result[0].type.should.equal('arrayStart')
        result[0].matches[0].should.equal('abc')
        result[2].type.should.equal('arrayEnd')
        done()
    })
})
