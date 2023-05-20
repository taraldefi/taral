import * as crypto from 'crypto';
import * as url from 'url';
import { encode } from './encode';

interface HotpOptions {
  key: string;
  counter: number;
  length?: number;
  encoding?: 'ascii' | 'utf8' | 'base64' | 'hex';
  algorithm?: 'sha1' | 'sha256' | 'sha512';
  window?: number;
}

interface TotpOptions extends HotpOptions {
  step?: number;
  window?: number;
  time?: number;
}

interface GenerateSecretOptions {
  length?: number;
  symbols?: boolean;
  otpauth_url?: boolean;
  name?: string;
  issuer?: string;
  type?: string;
}

interface VerifyOptions extends Omit<HotpOptions, 'window'> {
  token: string;
  delta?: number;
  window?: number;
  time?: number;
  step?: number;
}

// helper functions
function pad(length: number): string {
  return new Array(length + 1).join('0');
}

// hotp
export function hotpGenerate(options: HotpOptions): string {
  const key = options.key;
  const counter = options.counter;
  const length = options.length || 6;
  const encoding = options.encoding || 'ascii';
  const algorithm = options.algorithm || 'sha1';

  const hmac = crypto.createHmac(algorithm, Buffer.from(key, encoding));
  hmac.update(Buffer.from(pad(16), 'hex'));

  const digest = hmac.digest();
  const offset = digest[digest.length - 1] & 0xf;

  const binary =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  const token = binary % Math.pow(10, length);

  return pad(length).slice(token.toString().length) + token;
}

export function hotpVerifyDelta(
  options: HotpOptions & { token: string },
): number | null {
  const token = options.token;
  const key = options.key;
  const counter = options.counter;
  const window = options.window || 50;
  const length = options.length || 6;

  for (let i = counter - window; i <= counter + window; ++i) {
    const generatedToken = hotpGenerate({ ...options, counter: i });
    if (generatedToken === token) {
      return i - counter;
    }
  }

  return null;
}

export function hotpVerify(options: HotpOptions & { token: string }): boolean {
  return hotpVerifyDelta(options) !== null;
}

// totp
export function totpGenerate(options: TotpOptions): string {
  const step = options.step || 30;
  const time = options.time || Date.now();
  const counter = Math.floor(time / 1000 / step);

  return hotpGenerate({ ...options, counter });
}

export function totpVerifyDelta(options: VerifyOptions): number | null {
  const time = options.time || Date.now();
  const step = options.step || 30;
  const counter = Math.floor(time / 1000 / step);

  return hotpVerifyDelta({ ...options, counter });
}

export function totpVerify(options: VerifyOptions): boolean {
  return totpVerifyDelta(options) !== null;
}

// secret generation
export function generateSecret(options: GenerateSecretOptions = {}): {
  ascii: string;
  hex: string;
  base32: string;
  otpauth_url?: string;
} {
  const length = options.length || 32;
  const name = options.name || 'SecretKey';
  const type = options.type || 'totp';
  const issuer = options.issuer;

  const buf = crypto.randomBytes(length);
  const hex = buf.toString('hex');
  const base32 = encode(buf).toString().replace(/=/g, '');

  const response: {
    ascii: string;
    hex: string;
    base32: string;
    otpauth_url?: string;
  } = {
    ascii: buf.toString(),
    hex,
    base32,
  };

  if (options.otpauth_url) {
    response.otpauth_url = otpauthURL({
      type,
      label: encodeURIComponent(name),
      secret: base32,
      issuer: encodeURIComponent(issuer || ''),
    });
  }

  return response;
}

// otpauth
export function otpauthURL(options: {
  type: string;
  secret: string;
  label: string;
  issuer?: string;
  counter?: number;
  digits?: number;
  period?: number;
}): string {
  const type = options.type || 'totp';
  const secret = options.secret;
  const label = options.label;
  const issuer = options.issuer;
  const counter = options.counter;
  const period = options.period || 30;
  const digits = options.digits || 6;

  const query: { [key: string]: string | number } = {
    secret,
    digits,
  };

  if (issuer) query.issuer = issuer;
  if (type === 'hotp') query.counter = counter;
  if (type === 'totp') query.period = period;

  const otpauth = url.format({
    protocol: 'otpauth',
    slashes: true,
    host: type,
    pathname: label,
    query,
  });

  return otpauth;
}

export default {
  hotp: {
    generate: hotpGenerate,
    verifyDelta: hotpVerifyDelta,
    verify: hotpVerify,
  },
  totp: {
    generate: totpGenerate,
    verifyDelta: totpVerifyDelta,
    verify: totpVerify,
  },
  generateSecret,
  otpauthURL,
};
