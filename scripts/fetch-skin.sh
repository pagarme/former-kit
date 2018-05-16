#!/bin/bash

REPO=https://github.com/pagarme/former-kit-skin-pagarme

pushd /tmp

git clone --depth=1 -b "$CIRCLE_BRANCH" "$REPO" skin-pagarme

if test $? -ne 0; then
  rm -rf skin-pagarme
  git clone --depth=1 "$REPO" skin-pagarme
fi

pushd skin-pagarme

yarn

yarn build

yarn link

popd
popd

yarn link former-kit-skin-pagarme
