import React, {useState, useEffect, useRef} from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {SetObject,GetObject} from 'common/utils/StorageObject.js'
import axios from 'axios';
import VectorLayer from './VectorLayer';

export default function Map({map,setMapLoaded,children}){
    const mapContainer = useRef(null);
 
    const [lng, setLng] = useState(GetObject("lng") ? GetObject("lng") : -70.9);
    const [lat, setLat] = useState(GetObject("lat") ? GetObject("lat") : 42.35);
    const [zoom, setZoom] = useState(GetObject("zoom") ? GetObject("zoom") : 9);
    console.log('in harta')
    useEffect(() => {
        SetObject("lng",lng);
    },[lng])
    
    useEffect(() => {
        SetObject("lat",lat); 
    },[lat])

    useEffect(() => {
        SetObject("zoom",zoom);
    },[zoom])

    useEffect(() => {
       //alert("map mount")
    },[])

 
    useEffect(() => {
        if (!map.current) {
            
            mapboxgl.accessToken = 'pk.eyJ1IjoiYm9nZGZsb3IiLCJhIjoiY2xhbzAwZDJkMHVqNTNvdGE3OW1jYzI1ayJ9.uQWp500vHAcbxHazvOcXYg';
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom
            });

            map.current.on('load', () => {
                setMapLoaded(true)
 /*               map.current.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 14
                });
                // add the DEM source as a terrain layer with exaggerated height
              map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
 */ 
                });


            map.current.on('moveend', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));    
            });
/*
            if (!children.length) {
                children = [children];
              }
            
            children.map((item, i) => (
                    VectorLayer(map.current,item.props.name,item.props.type)
                )
            )
*/
        }
    });


    return(
        <React.Fragment>
            <div ref={mapContainer} className="map-container">
            </div>
            {/* { map.current? children : ''} */}
        </React.Fragment>    
    )

}