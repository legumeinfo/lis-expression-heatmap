#!/bin/sh

XML=$1
FORMAT=$2

QUERY=`cat $XML`

curl --data-urlencode query="$QUERY" -d format=$FORMAT https://dev.lis.ncgr.org/cicermine/service/query/results

echo ""
