import React from 'react';
import { useState, useEffect } from 'react';
import CanvasXpressReact from 'canvasxpress-react';

import Loader from './common/loader';
import querySources from "./query/querySources.js";
import querySampleDescriptions from "./query/querySampleDescriptions.js";
import queryExpressionData from "./query/queryExpressionData.js";
import getData from "./chart/getData.js";

export default function RootContainer({ serviceUrl, entity, config }) {
    const featureIds = entity.value;
    const [error, setError] = useState(null);
    const [graph, setGraph] = useState(null);
    const [smpsKm, setSmpsKm] = useState(2);
    const [varsKm, setVarsKm] = useState(2);
    // all expression sources
    const [sources, setSources] = useState(null);
    // data for chosen source
    const [source, setSource] = useState(null);
    const [sampleDescriptions, setSampleDescriptions] = useState(null);
    const [data, setData] = useState(null);

    // canvasXpress config properties
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
        'samplesKmeaned': true,
        'variablesKmeaned': true,
        'kmeansSmpClusters': smpsKm,
        'kmeansVarClusters': varsKm,
        'linkage': 'complete',
    }

    // TIP: useEffect with empty array dependency only runs once!
    useEffect(() => {
        querySources(serviceUrl)
            .then(response => {
                setSources(response);
            })
            .catch(() => {
                setError("No expression experiments found.");
            });
    }, []);

    // set the samples and variables k-means
    useEffect(() => {
        if (graph) {
            graph.kmeansSamples(true);
            graph.kmeansSmpClusters = smpsKm;
            graph.kmeansVariables(true);
            graph.kmeansVarClusters = varsKm;
        }
    });

    // set the graph reference
    function onRef(graph) {
        setGraph(graph);
    }

    // set the source and get its data
    var evts = null;
    function selectSource(event) {
        var i = event.target.value;
        if (i < 0) {
            setSource(null);
            setSampleDescriptions(null);
            setData(null);
            evts = null;
        } else {
            setSource(sources[i]);
            querySampleDescriptions(serviceUrl, sources[i])
                .then(response => {
                    setSampleDescriptions(response);
                })
                .catch(() => {
                    setError("No samples found for expression source "+sources[i].primaryIdentifier);
                });
            queryExpressionData(serviceUrl, sources[i], featureIds)
                .then(response => {
                    setData(getData(response));
                })
                .catch(() => {
                    setError("No expression data found in "+sources[i].primaryIdentifier+" for these genes.");
                });

            evts = {
                "mousemove": function(o, e, t) {
                    if (o.y && o.y.vars.length==1 && o.y.smps.length==1) {
                        const value = o.y.data[0][0]+" TPM";
                        t.showInfoSpan(e, value);
                    } else if (o.y && o.y.smps.length==1) {
                        const sample = o.y.smps[0];
                        const s = sampleDescriptions[sample];
                        t.showInfoSpan(e, s);
                    } else if (o.y && o.y.vars.length==1) {
                        const gene = o.y.vars[0];
                        t.showInfoSpan(e, "we need the geneDescriptionMap"); // geneDescriptionMap.get(gene));
                    }
                },
                "mouseout": function(o, e, t) {
                },
                "click": function(o, e, t) {
                    // if (o.y && o.y.vars.length==1) {
                    //     const gene = o.y.vars[0];
                    //     const url = "/${WEB_ROPPERTIES['webapp.path']}/gene:"+genePrimaryIDMap.get(gene);
                    //     window.open(url);
                    // }
                },
                "dblclick": function(o, e, t) {
                }
            }
        }
    }

    function selectSmpsKm(event) {
        setSmpsKm(event.target.value);
    }

    function selectVarsKm(event) {
        setVarsKm(event.target.value);
    }

    if (error) return (
        <div className="rootContainer error">{ error }</div>
    );

    return (
        <div className="rootContainer">
            {sources && (
	        <div className="selector">
                    <select name="sourceIndex" onChange={selectSource}>
                        <option key={-1} value={-1}>--- SELECT EXPRESSION EXPERIMENT ---</option>
                        {sources.map((source,i) => (
                            <option key={i} value={i}>{source.primaryIdentifier}</option>
                        ))}
                    </select>
                </div>
            )}
            {source && data && (
                <div>
                    <div className="synopsis">{source.synopsis}</div>
                    <div className="expression-unit">Expression unit: TPM</div>
                    <div className="kmeans-selectors">
                        Sample K-means:
                        <select id="smps-km" value={smpsKm} onChange={selectSmpsKm}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        Gene K-means:
                        <select id="vars-km" value={varsKm} onChange={selectVarsKm}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="canvas">
                        <CanvasXpressReact target={"canvas"} data={data} config={conf} events={evts} height={800} width={1150} onRef={onRef} />
                    </div>
                </div>
            )}
            {!sources && (
                <Loader />
            )}
        </div>
    );
}


// <i>Slide window with mouse; change scale with mouse wheel over axis; resize plot by dragging edges; select region to zoom in; click marker to see its page.</i>



            // {sampleData && (
            //     <code>{JSON.stringify(sampleData)}</code>
            // )}
            // {chartData && (
            //     <code>{JSON.stringify(chartData)}</code>
            // )}



