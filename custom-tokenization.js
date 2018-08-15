module.exports = function (tokens, customLabels) {
    let editedTokens = tokens;
    let labelsWords = Object.keys(customLabels);

    editedTokens.forEach((label, tokenIndex) => {
        labelsWords.forEach(labeledWords => {
            let check = true
            let arrayOfLabeledWords = labeledWords.split(' ')
            let removedTokens = arrayOfLabeledWords.length
            for(let [arrayIndex, word] of arrayOfLabeledWords.entries()) {
                if(word !== editedTokens[tokenIndex + arrayIndex]) {
                    check = false;
                    break;
                }
            };
            if(check) {
                editedTokens.splice(tokenIndex, removedTokens, labeledWords)
            }
        });
    });
    return editedTokens;
  }
