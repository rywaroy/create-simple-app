import prettier from 'prettier';

export function codeFormat(str: string) {
  return prettier.format(str, { parser: 'babel', tabWidth: 4, singleQuote: true });
}

export function codeFormatJson(str: string) {
  return prettier.format(str, { tabWidth: 4, parser: 'json' });
}
