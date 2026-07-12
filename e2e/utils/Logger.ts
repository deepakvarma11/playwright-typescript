import util from "util";

export class Logger {

  static info(message: string, data?: unknown) {
    console.log(
      `[INFO] ${message}`,
      data ? util.inspect(data, { depth: null, colors: true }) : ""
    );
  }

  static success(message: string, data?: unknown) {
    console.log(
      `[PASS] ${message}`,
      data ? util.inspect(data, { depth: null, colors: true }) : ""
    );
  }

  static warn(message: string, data?: unknown) {
    console.warn(
      `[WARN] ${message}`,
      data ? util.inspect(data, { depth: null, colors: true }) : ""
    );
  }

  static error(message: string, data?: unknown) {
    console.error(
      `[ERROR] ${message}`,
      data ? util.inspect(data, { depth: null, colors: true }) : ""
    );
  }
}