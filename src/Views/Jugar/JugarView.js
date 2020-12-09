import React, { useState, useEffect } from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap';
import io from "socket.io-client";
import Tablero from '../Components/Tablero';
import './styles.css'
import { navigate } from "@reach/router";

const ENDPOINT = "http://localhost:3000"; //cambiar cada vez
const tableroFormato = [
    [
        '0-0-nn-0',
        '0-1-nn-0',
        '0-2-nn-0',
        '0-3-nn-0',
        '0-4-nn-0',
        '0-5-nn-0',
        '0-6-nn-0',
        '0-7-nn-0',
        '0-8-nn-0',
        '0-9-nn-0',
    ],
    [
        '1-0-nn-0',
        '1-1-nn-0',
        '1-2-nn-0',
        '1-3-nn-0',
        '1-4-nn-0',
        '1-5-nn-0',
        '1-6-nn-0',
        '1-7-nn-0',
        '1-8-nn-0',
        '1-9-nn-0',
    ],
    [
        '2-0-nn-0',
        '2-1-nn-0',
        '2-2-nn-0',
        '2-3-nn-0',
        '2-4-nn-0',
        '2-5-nn-0',
        '2-6-nn-0',
        '2-7-nn-0',
        '2-8-nn-0',
        '2-9-nn-0',
    ],
    [
        '3-0-nn-0',
        '3-1-nn-0',
        '3-2-nn-0',
        '3-3-nn-0',
        '3-4-nn-0',
        '3-5-nn-0',
        '3-6-nn-0',
        '3-7-nn-0',
        '3-8-nn-0',
        '3-9-nn-0',
    ],
    [
        '4-0-nn-0',
        '4-1-nn-0',
        '4-2-nn-0',
        '4-3-nn-0',
        '4-4-nn-0',
        '4-5-nn-0',
        '4-6-nn-0',
        '4-7-nn-0',
        '4-8-nn-0',
        '4-9-nn-0',
    ],
    [
        '5-0-nn-0',
        '5-1-nn-0',
        '5-2-nn-0',
        '5-3-nn-0',
        '5-4-nn-0',
        '5-5-nn-0',
        '5-6-nn-0',
        '5-7-nn-0',
        '5-8-nn-0',
        '5-9-nn-0',
    ],
    [
        '6-0-nn-0',
        '6-1-nn-0',
        '6-2-nn-0',
        '6-3-nn-0',
        '6-4-nn-0',
        '6-5-nn-0',
        '6-6-nn-0',
        '6-7-nn-0',
        '6-8-nn-0',
        '6-9-nn-0',
    ],
    [
        '7-0-nn-0',
        '7-1-nn-0',
        '7-2-nn-0',
        '7-3-nn-0',
        '7-4-nn-0',
        '7-5-nn-0',
        '7-6-nn-0',
        '7-7-nn-0',
        '7-8-nn-0',
        '7-9-nn-0',
    ],
    [
        '8-0-nn-0',
        '8-1-nn-0',
        '8-2-nn-0',
        '8-3-nn-0',
        '8-4-nn-0',
        '8-5-nn-0',
        '8-6-nn-0',
        '8-7-nn-0',
        '8-8-nn-0',
        '8-9-nn-0',
    ],
    [
        '9-0-nn-0',
        '9-1-nn-0',
        '9-2-nn-0',
        '9-3-nn-0',
        '9-4-nn-0',
        '9-5-nn-0',
        '9-6-nn-0',
        '9-7-nn-0',
        '9-8-nn-0',
        '9-9-nn-0',
    ],
]

const JugarView = (props) => {
    const [room, setRoom] = useState("");
    const [tableroJugador, setTableroJugador] = useState([]);
    const [tableroServer, setTableroServer] = useState([]);
    const [selected, setSelected] = useState("");
    const [disparos, setDisparos] =useState([]);
    const [tableroEnemigo, setTableroEnemigo] = useState(tableroFormato);
    const [showPerdiste, setShowPerdiste] = useState(false);
    const [showGanaste, setShowGanaste] = useState(false);
    const [showEsperando, setShowEsperando] = useState(true);
    const [showTurno, setShowTurno] = useState(false);

    useEffect(() => {
        const [tableroLocal, tableroServer] = generarRandomTablero();
        setTableroJugador(tableroLocal);
        setTableroServer(tableroServer);

        const fetchData = async () => {
            const response = await fetch(`${ENDPOINT}/room`)
            const data = await response.json();
            if(data.room){
                const {room:uid} = data;
                setRoom(uid);
                console.log(uid);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(room.length>0){
            const socket = io(`${ENDPOINT}/${room}`);
            
            socket.on('start', () => {   
                socket.emit('start',  tableroServer);
                console.log("comienza juego");
                setShowEsperando(false);
            });
            
            socket.on('fracaso', (data) => { // data: {y:2, x:2}
                console.log("no le diste :(",data);
                const {x, y} = data;
                updateTableroEnemigo(x,y,false);
            });
            socket.on('exito', (data) => { // data: {y:2, x:2}
                console.log("si le diste :)",data);
                const {x, y} = data;
                updateTableroEnemigo(x,y,true);
            });
            socket.on('salvado', (data) => { // data: {y:2, x:2}
                console.log("no te dieron :)",data);
                const {x, y} = data;
                updateTableroJugador(x,y,false);
            });
            socket.on('impacto', (data) => { // data: {y:2, x:2}
                console.log("si te dieron :(",data);
                const {x, y} = data;
                updateTableroJugador(x,y,true);
            });
            socket.on('ganador', (data) => { // data: {y:2, x:2}
                console.log("ganaste :) ");
                setShowGanaste(true);
                socket.disconnect();
            });
            socket.on('perdedor', (data) => { // data: {y:2, x:2}
                console.log("perdiste :() ");
                setShowPerdiste(true);
                socket.disconnect();
            });
            socket.on('turno', () => {
                setShowTurno(false);
                setTimeout(() => {
                    setShowTurno(true);
                    let x = Math.floor(Math.random() * 10) + 0;
                    let y = Math.floor(Math.random() * 10) + 0;
                    let disparo = `${x}+${y}`;
                    let copy = disparos;
                    while(copy.includes(disparo)){
                        x = Math.floor(Math.random() * 10) + 0;
                        y = Math.floor(Math.random() * 10) + 0;
                        disparo = `${x}+${y}`;
                    }
                    
                    copy.push(disparo);
                    setDisparos(copy);
                    socket.emit('disparo', {
                        x: x,
                        y: y
                    });
                    console.log("cambio de turno");
                }, 2000);//espera 1 segundo cada disparo
            });
        }
    }, [room]);

    const alertaEsperando = (
        <Alert className="alerta" variant="primary" >
            <Alert.Heading>Esperando 🥸</Alert.Heading>
            <p>
            No ha llegado un rival aún 
            </p>
            <Spinner animation="border" variant="dark" />
        </Alert>
    );

    const alertaTurno = (
        <Alert className="alerta" variant="primary" >
            <Alert.Heading>Es tu turno 😳 </Alert.Heading>
            <p>
                Seleccionando disparo
            </p>
            <Spinner animation="border" variant="dark" />
        </Alert>
    );
      
    const alertaGanaste = (
        <Alert className="alerta" variant="success" onClose={() => setShowGanaste(false)} dismissible>
            <Alert.Heading>Ganaste! 🥸</Alert.Heading>
            <p>
            Tu rival no trae nada  
            </p>
            <Button onClick={() => navigate('/')}>Jugar otra vez</Button>
        </Alert>
    );

    const alertaPerdiste = (
        <Alert className="alerta" variant="danger" onClose={() => setShowPerdiste(false)} dismissible>
            <Alert.Heading>Perdiste! 🤥</Alert.Heading>
            <p>
            Para la próxima 
            </p>
            <Button onClick={() => navigate('/')}>Jugar otra vez</Button>
        </Alert>
    );

    const updateTableroJugador = (x, y, hit) => {
        const actual = tableroJugador[x][y];
        let final = "";
        if(hit){
            final = actual.replace(/.$/,"2");
        }
        else{
            final = actual.replace(/.$/,"1");
        }
        tableroJugador[x][y] = final;
        setTableroJugador([...tableroJugador]);
    }

    const updateTableroEnemigo = (x, y, hit) => {
        const actual = tableroEnemigo[x][y];
        let final = "";
        if(hit){
            final = actual.replace(/.$/,"2");
        }
        else{
            final = actual.replace(/.$/,"1");
        }
        tableroEnemigo[x][y] = final;
        setTableroEnemigo([...tableroEnemigo]);
    }

    return (
        <div>
            <h1>Battleship</h1>
            <div>
                {showEsperando ? alertaEsperando : ""}
                {showTurno ? alertaTurno : ""}
                {showPerdiste ? alertaPerdiste : ""}
                {showGanaste ? alertaGanaste : ""}
                <Tablero className='' tablero={tableroJugador} name="TU"/>
                <Tablero className='' tablero={tableroEnemigo} name="ENEMIGO"/>
            </div>
        </div>
    )

}

const generarRandomTablero = () => {
    //gen tablero en formato para local y servidor
    //gen tablero local. formato por celda= 'x-y-primeras2letrasBarco-status'
    //status: 1=miss, 2=hit, 0=libre

    const barcos = [
        { barco: 'po', tam: 5 },
        { barco: 'ac', tam: 4 },
        { barco: 'su', tam: 3 },
        { barco: 'de', tam: 3 },
        { barco: 'pa', tam: 2 },
    ]

    const tableroLocal = [
        [
            '0-0-nn-0',
            '0-1-nn-0',
            '0-2-nn-0',
            '0-3-nn-0',
            '0-4-nn-0',
            '0-5-nn-0',
            '0-6-nn-0',
            '0-7-nn-0',
            '0-8-nn-0',
            '0-9-nn-0',
        ],
        [
            '1-0-nn-0',
            '1-1-nn-0',
            '1-2-nn-0',
            '1-3-nn-0',
            '1-4-nn-0',
            '1-5-nn-0',
            '1-6-nn-0',
            '1-7-nn-0',
            '1-8-nn-0',
            '1-9-nn-0',
        ],
        [
            '2-0-nn-0',
            '2-1-nn-0',
            '2-2-nn-0',
            '2-3-nn-0',
            '2-4-nn-0',
            '2-5-nn-0',
            '2-6-nn-0',
            '2-7-nn-0',
            '2-8-nn-0',
            '2-9-nn-0',
        ],
        [
            '3-0-nn-0',
            '3-1-nn-0',
            '3-2-nn-0',
            '3-3-nn-0',
            '3-4-nn-0',
            '3-5-nn-0',
            '3-6-nn-0',
            '3-7-nn-0',
            '3-8-nn-0',
            '3-9-nn-0',
        ],
        [
            '4-0-nn-0',
            '4-1-nn-0',
            '4-2-nn-0',
            '4-3-nn-0',
            '4-4-nn-0',
            '4-5-nn-0',
            '4-6-nn-0',
            '4-7-nn-0',
            '4-8-nn-0',
            '4-9-nn-0',
        ],
        [
            '5-0-nn-0',
            '5-1-nn-0',
            '5-2-nn-0',
            '5-3-nn-0',
            '5-4-nn-0',
            '5-5-nn-0',
            '5-6-nn-0',
            '5-7-nn-0',
            '5-8-nn-0',
            '5-9-nn-0',
        ],
        [
            '6-0-nn-0',
            '6-1-nn-0',
            '6-2-nn-0',
            '6-3-nn-0',
            '6-4-nn-0',
            '6-5-nn-0',
            '6-6-nn-0',
            '6-7-nn-0',
            '6-8-nn-0',
            '6-9-nn-0',
        ],
        [
            '7-0-nn-0',
            '7-1-nn-0',
            '7-2-nn-0',
            '7-3-nn-0',
            '7-4-nn-0',
            '7-5-nn-0',
            '7-6-nn-0',
            '7-7-nn-0',
            '7-8-nn-0',
            '7-9-nn-0',
        ],
        [
            '8-0-nn-0',
            '8-1-nn-0',
            '8-2-nn-0',
            '8-3-nn-0',
            '8-4-nn-0',
            '8-5-nn-0',
            '8-6-nn-0',
            '8-7-nn-0',
            '8-8-nn-0',
            '8-9-nn-0',
        ],
        [
            '9-0-nn-0',
            '9-1-nn-0',
            '9-2-nn-0',
            '9-3-nn-0',
            '9-4-nn-0',
            '9-5-nn-0',
            '9-6-nn-0',
            '9-7-nn-0',
            '9-8-nn-0',
            '9-9-nn-0',
        ],
    ]
    const tableroInicialServer = {
        portaaviones: {
            yi: 0,
            yf: 0,
            xi: 0,
            xf: 4
        },
        acorazado: {
            yi: 3,
            yf: 6,
            xi: 0,
            xf: 0
        },
        submarino: {
            yi: 2,
            yf: 2,
            xi: 0,
            xf: 2
        },
        patrullero: {
            yi: 5,
            yf: 5,
            xi: 0,
            xf: 1
        },
        destructor: {
            yi: 6,
            yf: 8,
            xi: 5,
            xf: 5
        }
    }

    //gen local tablero
    for (let barco of barcos) {
        const serverShip = Object.keys(tableroInicialServer).find(e => e.includes(barco.barco))
        const orientation = Math.random() < 0.5; //0 horizontal, 1 vertical
        const limit = 10 - barco.tam;
        let disponible = false;
        let start = 0;
        let end = 0;
        if (orientation) { //vertical
            while (!disponible) {
                start = Math.floor(Math.random() * 10) + 0
                end = Math.floor(Math.random() * limit) + 0
                for (let i = 0; i < barco.tam; i++) {
                    if (tableroLocal[start][end + i].includes('nn')) {
                        disponible = true;
                    } else {
                        disponible = false;
                        break
                    }
                }
            }
            for (let i = 0; i < barco.tam; i++) {
                tableroLocal[start][end + i] = `${start}-${end + i}-${barco.barco}-0`
            }
            tableroInicialServer[serverShip].xi = start
            tableroInicialServer[serverShip].yi = end
            tableroInicialServer[serverShip].xf = start
            tableroInicialServer[serverShip].yf = end + barco.tam - 1
        } else { //horizontal
            while (!disponible) {
                start = Math.floor(Math.random() * limit) + 0; //y axis
                end = Math.floor(Math.random() * 10) + 0
                for (let i = 0; i < barco.tam; i++) {
                    if (tableroLocal[start + i][end].includes('nn')) disponible = true;
                    else {
                        disponible = false;
                        break
                    }
                }
            }
            for (let i = 0; i < barco.tam; i++) {
                tableroLocal[start + i][end] = `${start + i}-${end}-${barco.barco}-0`
            }
            tableroInicialServer[serverShip].xi = start
            tableroInicialServer[serverShip].yi = end
            tableroInicialServer[serverShip].xf = start + barco.tam - 1
            tableroInicialServer[serverShip].yf = end
        }
    }
    return [tableroLocal, tableroInicialServer];
}

export default JugarView