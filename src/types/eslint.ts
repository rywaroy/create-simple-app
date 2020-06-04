export interface IEslintConfig {
  [prop: string]: any;
  plugins: string[];
  parser?: string | string[];
}
