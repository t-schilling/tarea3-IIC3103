import React, {useState} from 'react';
import socket from './componentes/Socket';
import Chat from './componentes/Chat';
import Info from './componentes/Info';
import './App.css';

function App() {

  const [username, setUsername] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    socket.emit('TRUCKS');
    //console.log('Emitiendo TRUCKS')
    //console.log('el nombre de usuario es :' + username)
    e.preventDefault();
    if (username !== ''){
      setRegistrado(true);
      //console.log('registrado = ' + registrado)
    }
  }



  return (
    <div className="App">
      <div className="titleArea"><h1 align="center">Tarea 3</h1>
      
      {
        !registrado && 

        <form className="logIn" onSubmit={registrar}>
          <label> Escoja un nombre de usuario:</label>
          <input value={username} onChange={e => setUsername(e.target.value)}></input>
          <button>Ingresar a la pagina</button>
        </form>
      }
      {
        registrado &&

        <div className="chatArea"> <Chat username={username}/> </div>
      }

      {
        registrado &&
        
          <Info/>
      }


    </div>
    </div>
  );
}

export default App;
