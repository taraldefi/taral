import { OtpAppName } from './constants';
import { generateSecret } from './otp';

export function quintetCount(buff: Buffer): number {
  const quintets = Math.floor(buff.length / 5);
  return buff.length % 5 === 0 ? quintets : quintets + 1;
}

export function generateTaralOtpSecret(): {
  hex: string;
  base32: string;
  otpauth_url: string;
} {
  const secret = generateSecret({ name: OtpAppName });

  const { hex, base32, otpauth_url } = secret;

  return { hex, base32, otpauth_url };
}
