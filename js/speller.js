export default {
  check,
  lookup,
};

var elements;

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
  elements = await (await fetch("periodic-table.json")).json();
}

function check(inputWord) {
  // TODO: determine if `inputWord` can be spelled
  // with periodic table symbols; return array with
  // them if so (empty array otherwise)
  if (inputWord.length > 0) {
    for (let element of elements) {
      let symbol = element.symbol.toLowerCase();
      // did the symbol match the first
      // one or two characters in `inputWord`
      if (symbol.length <= inputWord.length) {
        if (inputWord.slice(0, symbol.length) == symbol) {
          // still have characters left
          if (inputWord.length > symbol.length) {
            let res = check(inputWord.slice(symbol.length));

            // matched successfully?
            if (res.length > 0) {
              return [symbol, ...res];
            }
          } else {
            return [symbol];
          }
        }
      }
    }
  }

  return [];
}

function lookup(elementSymbol) {
  // TODO: return the element entry based on specified
  // symbol (case-insensitive)
  for (let element of elements) {
    if (element.symbol.toLowerCase() == elementSymbol) {
      return element;
    }
  }
}
