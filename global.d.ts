import type { AIBinding } from "@cloudflare/workers-types";

declare global {
  interface Env {
    AI: AIBinding;
  }
}
