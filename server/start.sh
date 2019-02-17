#!/bin/sh

if [ "$NODE_ENV" = "production" ]; then
  node server/index.js;
else
  nodemon server/index.js;
fi