import React from 'react';
import Loader from './common/loader';
import { useState, useEffect } from 'react';

import queryData from "./query/queryData.js";
import getChartData from "./chart/getChartData.js";
import getSamples from "./chart/getSamples.js";
import getFeatures from "./chart/getFeatures.js";
import getSources from "./chart/getSources.js";

import { ReactGridHeatmap } from "./components/ReactGridHeatmap.jsx";

function RootContainer({ serviceUrl, entity, config }) {
    const [chartData, setChartData] = useState(null);
    const [samples, setSamples] = useState(null);
    const [features, setFeatures] = useState(null);
    const [sources, setSources] = useState(null);
    const [error, setError] = useState(null);

    const [sourceIndex, setSourceIndex] = useState(0);

    // DEBUG
    const [response, setResponse] = useState(null);

    const featureIds = entity.value;

    // TIP: useEffect with empty array dependency only runs once!
    useEffect(() => {
        queryData(featureIds, serviceUrl)
            .then(response => {
                setResponse(response);
                setChartData(getChartData(response));
                setSamples(getSamples(response));
                setFeatures(getFeatures(response));
                setSources(getSources(response));
            })
            .catch(() => {
                setError("No expression data found!");
            });
    }, []);

    function handleChange(event) {
        setSourceIndex(event.target.value);
    }

    if (error) return (
        <div className="rootContainer error">{ error }</div>
    );

    return (
        <div className="rootContainer">
            {(chartData && features && samples && sources) ? (
                <div>
                    <select name="source" value={sourceIndex} onChange={handleChange} style={{ 'margin-bottom': '5px' }}>
                        {sources.map((source,i) => (
                            <option key={i} value={i}>{source}</option>
                        ))}
                    </select>
                    <ReactGridHeatmap samples={samples} features={features} data={chartData} />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}

// need to export here for some reason
export default RootContainer;

                        // {chartData.datasets.map((dataset,i) => (
                        //     <option key={i} value={i}>{dataset.source}</option>
                        // ))}
