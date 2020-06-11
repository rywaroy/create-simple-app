export interface IPrompt {
  name: string;
  type: string;
  message: string;
  choices?: IPromptChoices[];
}

interface IPromptChoices {
  name: string | number;
  value: string | number;
}

export interface IPromptCallBack {
  (result: any): void;
}

export interface IModulePrompt {
  name: string | number;
  value: string | number;
}
