#!/bin/sh
curl --data-urlencode query="<query model=\"genomic\" view=\"ExpressionValue.value ExpressionValue.feature.id ExpressionValue.feature.secondaryIdentifier ExpressionValue.sample.name ExpressionValue.sample.num\" sortOrder=\"ExpressionValue.feature.secondaryIdentifier ASC ExpressionValue.sample.num ASC\" ><constraint path=\"ExpressionValue.feature.id\" op=\"ONE OF\" ><value>58145958</value><value>58259346</value><value>58261758</value><value>58289868</value><value>58316944</value><value>58318968</value><value>58348641</value><value>58353289</value><value>58381186</value><value>58427951</value><value>58440337</value><value>58457449</value><value>58461130</value><value>58517392</value><value>58552196</value><value>58559050</value></constraint></query>" \
	-d format=jsonobjects \
	https://mines.legumeinfo.org/beanmine/service/query/results
echo ""
