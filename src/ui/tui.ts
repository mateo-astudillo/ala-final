import prompts, { type PromptObject } from "prompts";

interface Config {
  onCancel?: () => void;
  hint: string;
}

const createPromptRunner = (config: Config) => {
  const { hint, onCancel } = config;

  return async <T>(question: PromptObject): Promise<T> => {
    return prompts(
      { hint, ...question },
      { onCancel }
    ) as Promise<T>;
  };
};

export const runPrompt = createPromptRunner({
  hint: "- Usa las flechas para navegar. Enter para seleccionar.",
  onCancel: () => {
    throw new Error("CANCEL");
  }
});

