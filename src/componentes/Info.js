import React, {useState, useEffect} from 'react';
import socket from './Socket';
import { MapContainer, TileLayer, Polyline, Tooltip, Marker, Circle, Popup} from 'react-leaflet';
import L from 'leaflet'
import './Map.css';
import './../App.css'
import minetruck from './minetruck.png';


const Info = () => {

    const[trucks, setTrucks] = useState([]);
    const[positions, setPosition] = useState([[]]);

    const myIcon = new L.Icon({
        iconUrl: minetruck,
        iconRetinaUrl: minetruck,
        popupAnchor:[-0,-0],
        iconSize: [32,45]
    })

    
    useEffect(() => {
        socket.on('TRUCKS', truck =>{
            for (let camion of truck){
                if(camion.position == undefined){
                    camion.position = [0,0];
                };
                if(camion.status == undefined){
                    camion.status = 'Unknown';
                };
            }
            setTrucks(trucks.concat(truck));
        });
        return () => {socket.off('TRUCKS')};
    },[trucks]);

    useEffect(() => {
        socket.on( 'POSITION', (obj) => {setPosition(positions.concat([{code: obj.code, position : obj.position}]));
        let truck  = trucks.find(element => element.code === obj.code);
            if (truck === undefined){
                console.log('[POSITION] codigo camion buscado: ' + obj.code)
                console.log( "[POSITION]  Truck not found");
            }
            else{
                truck.position = obj.position;
                //console.log('[POSITION]  Nueva posicion de: ' + obj.code + '<->' + obj.position);
            } 
        });
        return () => {socket.off('POSITION')};
    });

    useEffect(() => {
        socket.on('FAILURE', ({code, source}) => { 
            let truck  = trucks.find(element => element.code === code);
            if (typeof(truck) == undefined){
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
            let truck  = trucks.find(element => element.code === truck_object.code);
            if (typeof(truck) === undefined){{console.log('[MAP] entrando a tooltip')}
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
        console.log('[truckInfo] entrando a la funcion con: ' + truck.code)
        if (truck === undefined){
            return ("Truck not found");
        }
        //console.log('ahora tenemos' + truck)
        return (<div>
            <p>'Truck:' {truck.truck}</p><br />
            <p>'Code: '{truck.code}</p><br />
            <p>'Origin: '{truck.origin}'</p><br />
            <p>Destination: '{truck.destination}</p><br />
            <p>'Actual Position: '{truck.position}</p><br /> 
            <p>'Status: '{truck.status}</p> <br />
        </div>)   
    };

    const fixTruck = (e) =>{
        console.log('[fixTruck] Yo reparando el siguiente camion: ' + e);
        socket.emit('FIX', {code : e});
    }

    const changeStatus = () => {
        for (let element of trucks){
            if(element.status == undefined || element.status == ''){
                element.status = 'Ok';{console.log('[MAP] entrando a tooltip')}
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
                
                {trucks.map((data) => {
                    console.log('[MAP]: primer print posiciones' + data.code + '->'+  data.position)
                    if(data.position === undefined){
                        console.log('[MAP] error encontrando posiciones')
                        return('')
                    }
                    else{
                    console.log('[MAP] posiciones encontradas: '+ data.code + '->'+  data.position)
                    console.log('[MAP] coordinadas a imprimir: lat: ' + data.position[0] + 'long: ' + data.position[1])
                        return (
                            <div >
                                <Marker position={[data.position[0], data.position[1]]} icon={myIcon}>
                                        <Popup>
                                        {truckInfo(data.code)}                                
                                        </Popup>
                                </Marker>
                            </div>
                        )
                    }
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
                        {(e.status !== (('Ok') || ('Unknown'))) && 
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