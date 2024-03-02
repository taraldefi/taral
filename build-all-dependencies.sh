echo "Building libs "

yarn

cd libs/api && yarn && yarn compile && cd ../../
cd libs/bitcoin && yarn && yarn compile && cd ../../
cd libs/clarity-bin && yarn && yarn compile && cd ../../
cd libs/generate && yarn && yarn compile && cd ../../
cd libs/infrastructure && yarn && yarn compile && cd ../../
cd libs/node && yarn && yarn compile && cd ../../
cd libs/oracle && yarn && yarn compile && cd ../../
cd libs/shared && yarn && yarn compile && cd ../../
cd libs/stacks && yarn && yarn compile && cd ../../
cd libs/storage && yarn && yarn compile && cd ../../
cd libs/swap && yarn && yarn compile && cd ../../
cd libs/testing && yarn && yarn compile && cd ../../
cd libs/ui && yarn && yarn build && cd ../../

echo "Building packages "

cd packages/configuration && yarn && yarn compile && cd ../../
cd packages/contracts && yarn && yarn compile && cd ../../

echo "Building modules "


cd standalone/modules/cron && yarn && yarn build && cd ../../../
cd standalone/modules/events && yarn && yarn build && cd ../../../
cd standalone/modules/logger-telemetry && yarn && yarn build && cd ../../../
cd standalone/modules/multipart && yarn && yarn build && cd ../../../
cd standalone/modules/storage && yarn && yarn build && cd ../../../
cd standalone/modules/telemetry && yarn && yarn build && cd ../../../

echo "Finshed building everything"

$SHELL