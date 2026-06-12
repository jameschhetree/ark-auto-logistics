interface TurnstileOptions {
  sitekey: string;
  callback: (token: string) => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
}

interface Turnstile {
  render: (element: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile: Turnstile;
  }
}

export {};
