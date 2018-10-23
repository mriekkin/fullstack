#!/bin/sh
npm run build
rm -rf ../../../fullstack-osa3/build
cp -r build ../../../fullstack-osa3/

