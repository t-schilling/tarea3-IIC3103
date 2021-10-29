import React, {useState, useEffect} from 'react';
import socket from './Socket';
import { MapContainer, TileLayer, Polyline, Tooltip, Marker, Circle} from 'react-leaflet';
import './Map.css';
import './../App.css'

const Info = () => {

    const[trucks, setTrucks] = useState([]);
    const[positions, setPosition] = useState([[]]);

    
    useEffect(() => {
        console.log('Recibiendo info de TRUCKS');
        socket.on('TRUCKS', truck =>{
            //console.log('--->el code es' + truck[0].code)
            setTrucks(trucks.concat(truck));
            

        });
        return () => {socket.off('TRUCKS')};
    },[trucks]);

    useEffect(() => {
        
        socket.on( 'POSITION', (obj) => {setPosition(positions.concat([{code: obj.code, position : obj.position}]));
        let truck  = trucks.find(element => element.code === obj.code);
            if (truck === undefined){
                console.log( "Truck not found");
            }
            else{
                truck.position = obj.position;
                //console.log('Nueva posicion de: ' + truck.truck + '['+ truck.position+ ']');
            } 
        });
        return () => {socket.off('POSITION')};
    });

    useEffect(() => {
        socket.on('FAILURE', ({code, source}) => { 
            let truck  = trucks.find(element => element.code === code);
            if (typeof(truck) === undefined){
                return "Truck not found";
            }
            else{
                truck.status = source;
            }
        });
        return () => {socket.off('FAILURE')}
    });

    useEffect(() => {
        socket.on('FIX', (truck_object) =>{
            console.log('solucionando el problema de: ' + truck_object.code);
            let truck  = trucks.find(element => element.code === truck_object.code);
            if (typeof(truck) === undefined){
                return "Truck not found";
            }
            else{
                truck.status = 'Ok';
            }
        });
        return () => {socket.off('FIX')}
    });

    const truckInfo = (code) => {
        let truck  = trucks.find(element => element.code === code);
        //console.log(truck)
        if (truck === undefined){
            return ("Truck not found");
        }
        //console.log('ahora tenemos' + truck)
        return (<div>
            <p>'Truck:' {truck.truck}</p><br />
            <p>'Code: '{truck.code}</p><br />
            <p>'Origin: '{truck.origin}' -- Destination: '{truck.destination}</p><br />
            <p>'Status: '{truck.status}</p> <br />
        </div>)   
    };

    const fixTruck = (e) =>{
        //console.log('Vamos a reparar el siguiente camion: ' + e);
        socket.emit('FIX', {code : e});
    }

    const changeStatus = () => {
        for (let element of trucks){
            if(element.status == undefined || element.status == ''){
                element.status = 'Ok';
            }
        }
    }

    return (
        <div>
            <div className="mapArea">
                <MapContainer center={[-21.976193,-68.79]} zoom={11} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {trucks.map((dat) => {
                    return (
                        <div key={dat.code}>
                        <Polyline pathOptions={{color:'black'}} positions={[dat.origin, dat.destination]} />
                        </div>
                    )
                })}
                
                
                
                
            
                    
                </MapContainer>
            </div>


            
        <div className="infoArea">
            <div className="info_titulo">
                <div><h2>Trucks Information:</h2></div>
                <div className="solo_info"> 
                    {trucks.map((e,i) => <div  key={i}> 
                    <div> 
                        <div className='truckInfo_container'>
                        <div>Truck: {e.truck}</div>
                        <div>Code: {e.code}</div>
                        <div>Origin: {e.origin} </div>
                        <div>Destination: {e.destination} </div>
                        <div>Status: {e.status} </div>
                        <div>
                        {(e.status !== ('Ok')) && 
                            <button value={e.code} onClick={a => fixTruck(a.target.value)}>Fix Truck</button>}


                    </div>
                        </div>
                    </div>
                    </div>)}
                </div>
            </div>
        </div>
    </div>    

    )
}

export default Info;