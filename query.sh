#!/bin/sh
QUERY=`cat $1`
FORMAT=$2
URL="https://lis.ncgr.org/cicermine/service/query/results"

curl --data-urlencode query="$QUERY" -d format=$2 $URL
echo ""
