import React from 'react';
import Loader from './common/loader';
import { useState, useEffect } from 'react';

import queryData from "./query/queryData.js";

import getSources from "./chart/getSources.js";
import getFeatures from "./chart/getFeatures.js";
import getChartData from "./chart/getChartData.js";
import getSampleData from "./chart/getSampleData.js";

import { ReactGridHeatmap } from "./components/ReactGridHeatmap.jsx";

export default function RootContainer({ serviceUrl, entity, config }) {
    const featureIds = entity.value;
    const [error, setError] = useState(null);
    // overall data
    const [response, setResponse] = useState(null);
    const [sources, setSources] = useState(null);
    const [features, setFeatures] = useState(null);
    // per source data
    const [source, setSource] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [sampleData, setSampleData] = useState(null);

    // TIP: useEffect with empty array dependency only runs once!
    useEffect(() => {
        queryData(featureIds, serviceUrl)
            .then(response => {
                var sources = getSources(response);
                var features = getFeatures(response);
                setResponse(response);
                setSources(sources);
                setFeatures(features);
            })
            .catch(() => {
                setError("No expression data found!");
            });
    }, []);

    // set the source and get its data
    function handleChange(event) {
        var i = event.target.value;
        if (i < 0) {
            setSource(null);
            setChartData(null);
            setSampleData(null);
        } else {
            setSource(sources[i]);
            setChartData(getChartData(response, sources[i]));
            setSampleData(getSampleData(response, sources[i]));
        }
    }

    if (error) return (
        <div className="rootContainer error">{ error }</div>
    );

    return (
        <div className="rootContainer">
            {sources && (
                <select name="sourceIndex" onChange={handleChange} style={{ 'margin-bottom': '5px' }}>
                    <option key={-1}>Select expression experiment</option>
                    {sources.map((source,i) => (
                        <option key={i} value={i}>{source}</option>
                    ))}
                </select>
            )}
            {(sources && features && source && sampleData && chartData) && (
                <ReactGridHeatmap features={features} data={chartData} sampleData={sampleData} />
            )}
            {!sources && (
                <Loader />
            )}
        </div>
    );
}
