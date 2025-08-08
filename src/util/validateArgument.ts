export function validateArguments(
  port: string | undefined,
  url: string | undefined,
  startServer: (port: number, url: string) => void,
  program: any,
) {
  if (
    typeof port !== 'string' ||
    port.trim() === '' ||
    typeof url !== 'string' ||
    url.trim() === ''
  ) {
    console.error(
      'Error: Both --port and --origin are required and must be non-empty',
    );
    program.outputHelp();
    process.exit(1);
  }
  try {
    const portNumber = parseInt(port.trim(), 10);

    if (isNaN(portNumber)) {
      throw new Error(`Invalid port: ${port}, must be a number`);
    }

    if (!Number.isInteger(parseFloat(port.trim()))) {
      throw new Error(`Invalid port: ${port}, must be an integer`);
    }

    if (portNumber < 1 || portNumber > 65535) {
      throw new Error(`Invalid port: ${port}, must be between 1 and 65535`);
    }

    const originUrl = new URL(url.trim());
    if (!['http:', 'https:'].includes(originUrl.protocol)) {
      throw new Error(
        `Invalid origin: ${url}, must use HTTP or HTTPS protocol`,
      );
    }

    if (originUrl.hostname === '') {
      throw new Error(`Invalid origin: ${url}, must include a valid hostname`);
    }

    startServer(portNumber, url.trim());
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }

    program.outputHelp();
    process.exit(1);
  }
}
