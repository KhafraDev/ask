# ask
 prompt users in CLI

# Example
```js
const ask = require('ask');

ask('How old are you? ', {
    validate: i => !isNaN(i) && i >= 18
}).then(console.log);
```
