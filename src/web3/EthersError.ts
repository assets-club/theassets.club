import { ErrorCode } from '@ethersproject/logger';

export default interface EthersError extends Error {
  code: ErrorCode;
  reason: string;
}

export function isEthersError(err: unknown): err is EthersError {
  return err instanceof Error && (err as any).code && typeof (err as any).reason === 'string';
}
