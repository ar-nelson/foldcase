# foldcase: JavaScript implementation of the Unicode Case Folding Algorithm

This is a small Node module that implements the [Unicode Case Folding
Algorithm][1] by generating a conversion table from the [official case folding
table from `unicode.org`][2].

    const foldcase = require('foldcase');
    
    foldcase('ABC123'); // => 'abc123'

`foldcase` is similar to `String.prototype.toLowerCase`, but not the same. Its
intended use is case-insensitive string comparisons.

[Case folding][3] remains the same across Unicode versions, although
`toLowerCase`'s behavior may change. For example, because the Cherokee script
originally had only uppercase characters in Unicode, and lowercase characters
were added later, `foldcase` converts Cherokee text to *uppercase*.

    foldcase('ꮳꮃꭹ'); // => 'ᏣᎳᎩ'

This module has no dependencies, and should run in Node and on modern browsers.
Because it uses a few ES6 features (`\u{…}` escapes, `Array.from`), it won't run
on any version of IE without transpilation and polyfills.

Use `npm test` to lint and test. Use `npm run codegen` to regenerate
`case-tables.js` from the table at `unicode.org` (probably only works on Linux).

**Caveat emptor:** Because it's implemented in pure JS, and it operates on
32-bit codepoints instead of 16-bit characters, this algorithm is *slow*. Only
use this over `toLowerCase` if you know you need it for compatibility.

[1]: https://www.w3.org/International/wiki/Case_folding
[2]: http://www.unicode.org/Public/UNIDATA/CaseFolding.txt
[3]: https://unicode.org/faq/casemap_charprop.html#2

## API

### `foldcase(String)`

Alias for `foldcase.full`.

### `foldcase.full(String)`

Applies the full Unicode case folding algorithm. This algorithm may convert some
single characters into multiple characters.

    foldcase.full('Weiß'); // => 'weiss'

### `foldcase.simple(String)`

Applies the simple Unicode case folding algorithm. The simple algorithm will not
change the length (in code points) of its input string.

    foldcase.simple('Weiß'); // => 'weiß'

### `foldcase.charFull(String)`

Applies the full Unicode case folding algorithm to a single code point. The code
point may be a surrogate pair, so the argument may be a string of length 1 or 2.
If the argument is not a single code point, or does not have a case folding
conversion, the argument will be returned unchanged.

    foldcase.charFull('A');   // => 'a'
    foldcase.charFull('FOO'); // => 'FOO'

This version of case folding may convert single characters to multiple
characters.

    foldcase.charFull('ß'); // => 'ss'

### `foldcase.charSimple(String)`

Applies the simple Unicode case folding algorithm to a single code point. The
code point may be a surrogate pair, so the argument may be a string of length
1 or 2. If the argument is not a single code point, or does not have a case
folding conversion, the argument will be returned unchanged.

    foldcase.charSimple('A');   // => 'a'
    foldcase.charSimple('FOO'); // => 'FOO'

This version of case folding always returns a single code point when given
a single code point.

    foldcase.charSimple('ß'); // => 'ß'
