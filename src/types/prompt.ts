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
