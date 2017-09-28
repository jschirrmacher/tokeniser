module.exports = (str, rules) => {
    let tokens
    tokens = []

    while (str) {
        if (!rules.some(rule => {
                let matches
                if ((matches = rule.regex.exec(str))) {
                    tokens.push({type: rule.type, matches: Array.from(matches).splice(1)})
                    str = str.substr(matches[0].length)
                    return true
                }
            })) {
            throw 'Did not find any tokens'
        }
    }

    return tokens
}
