#!/bin/bash

for day in $(seq -w 1 25); do
    mkdir -p "$day"
    touch "$day/input.txt"
    touch "$day/1.ts"
    touch "$day/2.ts"
done