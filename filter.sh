#!/bin/bash

cut -d',' -f$(seq -s, 11 2 72) $1 | head -n1
cut -d',' -f$(seq -s, 12 2 72) $1 | sed 's/"//g'

