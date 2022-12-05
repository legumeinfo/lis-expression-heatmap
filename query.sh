#!/bin/sh
QUERY=`cat $1`
FORMAT=$2

#SERVER="mines.legumeinfo.org"
SERVER="dev.lis.ncgr.org"

MINE="phaseolusmine"

URL="https://$SERVER/$MINE/service/query/results"

curl --data-urlencode query="$QUERY" -d format=$2 $URL
echo ""
