<div>
    <MapContainer center={[0,0]} zoom={3} scrollWheelZoom={true}>
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
    {positions.map((data) => {
            return (
                
                <div key={data.position}>
                    <Marker center={data.position} radius={100}>
                        <Tooltip>
                            {truckInfo(data.code)}                                
                        </Tooltip>
                    </Marker>
                </div>
            )})}



{trucks.map((data) => {
                    if(!data.position){
                        return('')
                    }
                    console.log('posicioneeeees: '+ data.truck + '->'+  data.position)
                    return (
                
                <div key={data.position}>
                    <Marker center={data.position[0], data.position[1]} radius={100}>
                        <Tooltip>
                            {truckInfo(code)}                                
                        </Tooltip>
                    </Marker>
                </div>
            )})}
                   
         
    </MapContainer>
</div>