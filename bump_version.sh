#!/bin/bash
if [ -z "$1" ];
then
  echo "Version number not specified. Eg usage: bump_version.sh 0.0.6"
  exit 1
else
   darwin86=`openssl sha1 deploy/gauge-$1-darwin.x86.pkg | cut -d " " -f2`
   darwin86_64=`openssl sha1 deploy/gauge-$1-darwin.x86_64.pkg | cut -d " " -f2`
   linux86=`openssl sha1 deploy/gauge-$1-linux.x86.zip | cut -d " " -f2`
   linux86_64=`openssl sha1 deploy/gauge-$1-linux.x86_64.zip | cut -d " " -f2`
   windows86=`openssl sha1 deploy/gauge-$1-windows.x86.exe | cut -d " " -f2`
   windows86_64=`openssl sha1 deploy/gauge-$1-windows.x86_64.exe | cut -d " " -f2`
   echo "version: $1\ndarwin86: $darwin86\ndarwin86_64: $darwin86_64\nlinux86: $linux86\nlinux86_64: $linux86_64\nwindows86: $windows86\nwindows86_64: $windows86_64" > data/info.yml
fi