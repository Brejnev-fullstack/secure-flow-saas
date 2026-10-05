type LogLevel = "info" | "warn" | "error";

function formatMessage(level: LogLevel, message: string) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

export const logger = {
  info(message: string, meta?: unknown) {
    console.log(formatMessage("info", message));
    if (meta) console.log(meta);
  },

  warn(message: string, meta?: unknown) {
    console.warn(formatMessage("warn", message));
    if (meta) console.warn(meta);
  },

  error(message: string, meta?: unknown) {
    console.error(formatMessage("error", message));
    if (meta) console.error(meta);
  },
};
