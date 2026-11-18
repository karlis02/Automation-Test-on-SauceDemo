declare const process: {
  env: {
    SAUCEDEMO_USERNAME?: string
    SAUCEDEMO_PASSWORD?: string
  }
}

export function getCredentials(): {
  username: string
  password: string
} {
  const username = process.env.SAUCEDEMO_USERNAME
  const password = process.env.SAUCEDEMO_PASSWORD

  if (!username || !password) {
    throw new Error(
      "Set SAUCEDEMO_USERNAME and SAUCEDEMO_PASSWORD in the .env file before running tests",
    )
  }

  return { username, password }
}
