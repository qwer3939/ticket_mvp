import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBotAgent(userAgent: string): boolean {
  const botUserAgents = [
    "googlebot", // Google's bot
    "bingbot", // Bing's bot
    "slurp", // Yahoo's bot
    "duckduckbot", // DuckDuckGo's bot
    "baiduspider", // Baidu's bot
    "yandexbot", // Yandex's bot
    "sogou", // Sogou Spider
    "exabot", // Exalead's bot
    "facebot", // Facebook's bot
    "ia_archiver", // Alexa's bot
    "chrome-lighthouse",
    "google-adspeed-insights",
  ];

  const userAgentLower = userAgent.toLowerCase();

  // Return `true` if the userAgent matches any bot's userAgent
  return botUserAgents.some((botAgent) => userAgentLower.includes(botAgent));
}

type NODE_ENV = typeof process.env.NODE_ENV;
export function isTestMode(env: NODE_ENV) {
  return env === "test";
}

export function isDevelopmentMode(env: NODE_ENV) {
  return env === "development";
}

export function isProductionMode(env: NODE_ENV) {
  return env === "production";
}
