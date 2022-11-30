import React from 'react';
import { useState, useEffect } from 'react';
import Loader from './common/loader';
import CanvasXpressReact from 'canvasxpress-react';

import queryData from "./query/queryData.js";

import getSources from "./chart/getSources.js";
import getFeatures from "./chart/getFeatures.js";
import getChartData from "./chart/getChartData.js";
import getSampleData from "./chart/getSampleData.js";

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

    // config properties
    const heatmapIndicatorHeight = 50;
    const heatmapIndicatorWidth = 500;
    const varLabelScaleFontFactor = 1.2;
    const varLabelFontColor = "black";
    const varLabelFontStyle = "plain";
    const varLabelRotate = 45;
    const varTitleScaleFontFactor = 1.0;
    const smpLabelScaleFontFactor = 1.2;
    const smpLabelFontColor = "black";
    const smpLabelFontStyle = "plain";
    const smpLabelRotate = -45;
    const smpTitleScaleFontFactor = 0.5;

    // other constants
    const min_cluster = 5;
    const width_per_sample = 50;
    const height_per_gene = 50;

    // the static CanvasXpress configuration
    const conf = {
        'graphType': 'Heatmap',
        'smpTitle': 'Mouse over sample for description.',
        'varTitle': 'Mouse over gene for description; click to go to gene page.',
        'canvasBox': true,
        'showHeatMapIndicator': true,
        'heatmapCellBox': true,
        'heatmapIndicatorPosition': 'top',
        'heatmapIndicatorHistogram': false,
        'heatmapIndicatorHeight': heatmapIndicatorHeight,
        'heatmapIndicatorWidth': heatmapIndicatorWidth,
        'varLabelScaleFontFactor': varLabelScaleFontFactor,
        'varLabelFontColor': varLabelFontColor,
        'varLabelFontStyle': varLabelFontStyle,
        'varLabelRotate': varLabelRotate,
        'varTitleScaleFontFactor': varTitleScaleFontFactor,
        'smpLabelScaleFontFactor': smpLabelScaleFontFactor,
        'smpLabelFontColor': smpLabelFontColor,
        'smpLabelFontStyle': smpLabelFontStyle,
        'smpLabelRotate': smpLabelRotate,
        'smpTitleScaleFontFactor': smpTitleScaleFontFactor,
        'kmeansSmpClusters': 2,
        'kmeansVarClusters': 2,
        'linkage': 'complete',
        'samplesClustered': false,
        'variablesClustered': false,
        'showSmpDendrogram': false,
        'showVarDendrogram': false,
    }

    // TIP: useEffect with empty array dependency only runs once!
    useEffect(() => {
        queryData(featureIds, serviceUrl)
            .then(response => {
                setResponse(response);
                setSources(getSources(response));
                setFeatures(getFeatures(response));
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
            setSampleData({});
        } else {
            setSource(sources[i]);
            setChartData(getChartData(response, sources[i]));
            setSampleData(getSampleData(response, sources[i]));
        }
    }

    if (error) return (
        <div className="rootContainer error">{ error }</div>
    );

    const evts = {
        "mousemove": function(o, e, t) {
        },
        "mouseout": function(o, e, t) {
        },
        "click": function(o, e, t) {
        },
        "dblclick": function(o, e, t) {
        }
    }
    

    return (
        <div className="rootContainer">
            {sources && (
	        <div className="selector">
                    <select name="sourceIndex" onChange={handleChange}>
                        <option key={-1} value={-1}>--- SELECT EXPRESSION EXPERIMENT ---</option>
                        {sources.map((source,i) => (
                            <option key={i} value={i}>{source.name}</option>
                        ))}
                    </select>
                </div>
            )}
            {source && (
                <div className="synopsis">{source.synopsis}</div>
            )}
            {sampleData && (
                <code>{JSON.stringify(sampleData)}</code>
            )}
            {chartData && (
                <code>{JSON.stringify(chartData)}</code>
            )}
            {!sources && (
                <Loader />
            )}
        </div>
    );
}

            // <i>Slide window with mouse; change scale with mouse wheel over axis; resize plot by dragging edges; select region to zoom in; click marker to see its page.</i>
            // <CanvasXpressReact target={"canvas"} data={[]} config={conf} height={800} width={1150} events={evts} />
