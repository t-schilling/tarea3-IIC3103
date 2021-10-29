useEffect(() => {
    console.log('Recibiendo info de TRUCKS');
    socket.on('TRUCKS', truck =>{setTrucks(trucks.concat(truck))});
    return () => {socket.off()};
},[trucks]);

useEffect(() => {
    socket.on( 'POSITION', ({code, position}) => {setPosition(positions.concat({code, position}))});
});

useEffect(() => {
    socket.on('FAILURE', ({code, source}) => { 
        let truck  = trucks.find(element => element.code === code);
        if (typeof(truck) === undefined){
            return "Truck not found";
        }
        else{
            console.log('Actualizando el valor de truck:' + code);
            truck.status = source;
        }
    });
});

useEffect(() => {
    socket.on('FIX', (code) =>{
        let truck  = trucks.find(element => element.code === code);
        if (typeof(truck) === undefined){
            return "Truck not found";
        }
        else{
            truck.status = 'Ok';
        }
    }); 
    return () => {socket.off('FIX')};
});