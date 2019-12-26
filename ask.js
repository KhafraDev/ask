const { createInterface } = require('readline');
const { promisify } = require('util');

/**
 * Answer a question
 * @param {string} p Question to ask.
 * @param {Object} o Options
 * @param {Function} [o.validate] Validation function.
 * @returns {Promise<string>} Answer to the question. 
 */
const ask = async (p, o = {}) => {
    const readline = createInterface({ 
        input: process.stdin, 
        output: process.stdout 
    });
    
    readline.question[promisify.custom] = q => new Promise(resolve => readline.question(q, resolve));
    const question = promisify(readline.question);

    while(true) {
        const answer = await question(p);
        if(o.validate instanceof Function) {
            const value = o.validate(answer);

            if(value === true) {
                readline.close();
                return answer;
            } else {
                process.stdout.moveCursor(0, -1);  // move one line up
                process.stdout.cursorTo(p.length); // move cursor to end of question
                process.stdout.clearLine();  // clear the text.
            }
        } else {
            return answer;
        }
    }
}

module.exports = ask;