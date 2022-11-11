#!/bin/bash
for f in *.sol;
do
echo "Currently Executing ${f} ..... "
echo
echo
FileNameWithouExtension=`echo $f | cut -d "." -f 1`
#echo $FileNameWithouExtension
./asserter.sh $FileNameWithouExtension
echo
echo
done