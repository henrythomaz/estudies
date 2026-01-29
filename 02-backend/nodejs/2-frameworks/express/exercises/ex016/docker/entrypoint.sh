#!/bin/sh

echo " Rodando migrations..."
yarn migrate

echo " Iniciando servidor..."
yarn start:dev

