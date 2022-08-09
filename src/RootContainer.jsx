import React from 'react';
import Loader from './common/loader';
import { useState, useEffect } from 'react';

import queryData from "./query/queryData.js";
import getChartData from "./chart/getChartData.js";
import getSamples from "./chart/getSamples.js";
import getFeatures from "./chart/getFeatures.js";

import { ReactGridHeatmap } from "./components/ReactGridHeatmap.jsx";

function RootContainer({ serviceUrl, entity, config }) {
    const [chartData, setChartData] = useState([]);
    const [samples, setSamples] = useState([]);
    const [features, setFeatures] = useState([]);
    const [error, setError] = useState(null);

    const featureIds = entity.value;
    
    // TIP: useEffect with empty array dependency only runs once!
    useEffect(() => {
        queryData(featureIds, serviceUrl)
            .then(response => {
                setChartData(getChartData(response));
                setSamples(getSamples(response));
                setFeatures(getFeatures(response));
            })
            .catch(() => {
                setError("No expression data found!");
            });
    }, []);

    if (error) return (
        <div className="rootContainer error">{ error }</div>
    );
    
    return (
        <div className="rootContainer">
            {chartData.length>0 ? (
                <ReactGridHeatmap samples={samples} features={features} data={chartData} />
            ) : (
                <Loader />
            )}
        </div>
    );
}

// need to export here for some reason
export default RootContainer;
