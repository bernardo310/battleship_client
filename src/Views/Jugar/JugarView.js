import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:4001";

import Tablero from '../Components/Tablero';

const JugarView = (props) => {
    const [response, setResponse] = useState("");
    const [tableroJugador, setTableroJugador] = useState([])
    const [tableroServer, setTableroServer] = useState([])
    const [selected, setSelected] = useState("");
    useEffect(() => {
        const [tableroLocal, tableroServer] = generarRandomTablero();
        setTableroJugador(tableroLocal);
        setTableroServer(tableroServer);
        // const socket = socketIOClient(ENDPOINT);
        // socket.on("FromAPI", data => {
        //     setResponse(data);
        // });
        // socket.on("algo", (data) => {
        //     //algo
        //   });
    }, []);

    const updateTableroJugador = (x,y) => {
        //tableroJugador[x][y] = algo
        //setTableroJugador
    }

    const updateTableroEnemigo = () => {
        //to-do
    }


    return (
        <div>
            <h1>Jugar</h1>
            {/* <p>Jugador:{props.location.state.jugador}</p> */}
            <Tablero className='' selected={(event) => { setSelected(event.target.className) }} tablero={tableroJugador} />
            {selected ?
                <div>
                    <p>Atacar en {selected}</p>
                    <Button variant='primary'>Atacar</Button>
                </div>
                : ''
            }
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