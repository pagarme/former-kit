#!/bin/bash

pushd /tmp

git clone -b "$CIRCLE_BRANCH" https://github.com/pagarme/former-kit-skin-pagarme skin-pagarme

if test $? -ne 0; then
  popd
  exit 0
fi

pushd skin-pagarme

yarn

yarn build

yarn link

popd
popd

yarn link former-kit-skin-pagarme
