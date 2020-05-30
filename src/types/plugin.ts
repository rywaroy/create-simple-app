export interface IPlugin {
  id: string;
  apply: () => void;
}
