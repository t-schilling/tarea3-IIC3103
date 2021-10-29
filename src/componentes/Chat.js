import React, {useState, useEffect} from 'react';
import socket from './Socket';

const Chat = ({username}) => {
     
    const [mensaje, setMensaje] = useState('');
    const[mensajes, setMensajes] = useState([]);

    const[trucks, setTrucks] = useState([]);
    const[positions, setPosition] = useState([[]])


    useEffect(() => {
        //console.log('recibiendo mensajes')
        socket.on('CHAT', ({date, message, name}) => {
            //console.log(name+':'+message + '->('+date+')');
            setMensajes(mensajes.concat({date, message, name}));
        });
        
        return () => {
            socket.off('CHAT');
      };
    },[mensajes]);

    const submit = (e) => {
        e.preventDefault();
        //console.log({message : mensaje, name : username})
        socket.emit('CHAT', {message : mensaje, name : username})
        setMensaje("");
    }


    return (

        <div className="chat_todo">
            <div><h2>Chat</h2></div>
            <div className="chat"> 
                {mensajes.map((e,i) => <div  key={i}> 
                    <div>[{Date(e.date)}] -- {e.name}: {e.message}</div>
                </div>)}
            </div>
            <form className="chat_form" onSubmit={submit}>
                <label htmlFor=""> Escriba su mensaje : 
                </label>
                <textarea name="" id="" cols="30" value={mensaje} onChange={e => setMensaje(e.target.value)}>

                </textarea>
            <button> Enviar mensaje</button>


            </form>

        </div>
    )
}

export default Chat;