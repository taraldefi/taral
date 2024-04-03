#!/bin/sh

echo "Check that we have NEXT_PUBLIC_API_URL vars"
test -n "$NEXT_PUBLIC_API_URL"

echo "Entrypoint scriptp executed from: ${PWD}"

find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_LOCALNET_API_SERVER#$NEXT_PUBLIC_LOCALNET_API_SERVER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_TESTNET_API_SERVER#$NEXT_PUBLIC_TESTNET_API_SERVER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_REGTEST_API_SERVER#$NEXT_PUBLIC_REGTEST_API_SERVER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_MAINNET_API_SERVER#$NEXT_PUBLIC_MAINNET_API_SERVER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_LOCALNET_EXPLORER#$NEXT_PUBLIC_LOCALNET_EXPLORER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_TESTNET_EXPLORER#$NEXT_PUBLIC_TESTNET_EXPLORER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_REGTEST_EXPLORER#$NEXT_PUBLIC_REGTEST_EXPLORER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_MAINNET_EXPLORER#$NEXT_PUBLIC_MAINNET_EXPLORER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_LOCALNET_BITCOIN_EXPLORER#$NEXT_PUBLIC_LOCALNET_BITCOIN_EXPLORER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_TESTNET_BITCOIN_EXPLORER#$NEXT_PUBLIC_TESTNET_BITCOIN_EXPLORER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_MAINNET_BITCOIN_EXPLORER#$NEXT_PUBLIC_MAINNET_BITCOIN_EXPLORER#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_BASE_URL#$NEXT_PUBLIC_BASE_URL#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_TARAL_BANK_CONTRACT#$NEXT_PUBLIC_TARAL_BANK_CONTRACT#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_TARAL_LENDER_ADDRESS#$NEXT_PUBLIC_TARAL_LENDER_ADDRESS#g"

find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_SUSDT_CONTRACT#$NEXT_PUBLIC_SUSDT_CONTRACT#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_SHARP_PATH#$NEXT_SHARP_PATH#g"
find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_NEXT_AUTH_SECRET#$NEXT_PUBLIC_NEXT_AUTH_SECRET#g"

find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXTAUTH_URL#$NEXTAUTH_URL#g"

echo "Starting Nextjs"
exec "$@"