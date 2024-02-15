import invariant from "tiny-invariant";

export function getEnv() {
  invariant(process.env.ADMIN_EMAIL, "ADMIN_EMAIL is not set up");

  return {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  };
}

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}

export type ENV = ReturnType<typeof getEnv>;
