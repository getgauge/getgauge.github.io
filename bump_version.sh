#!/bin/bash
if [ -z "$1" ];
then
  echo "Version number not specified. Eg usage: bump_version.sh 0.0.6"
  exit 1
else
   sed -i.bak s/"current:.*$"/"current: $1"/g _data/version.yml
fi
