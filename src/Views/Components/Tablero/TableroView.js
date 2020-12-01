import React from 'react'
import './styles.css'
import { Table } from 'react-bootstrap'

const TableroView = (props) => {
    console.log(props)
    const tablero = [[], [], [], [], [], [], [], [], [], []]
    for (let i = 0; i < props.tablero.length; i++) {
        for (let j = 0; j < props.tablero[0].length; j++) {
            tablero[i][j] = <div>{props.tablero[i][j]}</div>
        }
    }
    console.log(tablero)
    return (
        <div>
            <p>tablero</p>
            <Table bordered={true}>
                <thead>
                    <th>-X- |Y|</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                </thead>

                <tbody>
                    {props.tablero.reverse().map((ex, index) => {
                        return (
                            <tr>
                                <th className={`${10-index}-nn`} key={'y'+(10-index)}>{10-index}</th>
                                {ex.map((ey, index) => {
                                    const parts = ey.split('-'); 
                                    //[0] x
                                    //[1] y
                                    //[2] ship first 2 letters
                                    //[3] status
                                    let status = "free";
                                    if(parts[3]==="0")
                                        status="free";
                                    else if(parts[3]==="1")
                                        status="miss";
                                    else if(parts[3]==="2")
                                        status="hit";

                                    return (
                                        <td className={`cell ${ey} ${!String(ey).includes('nn')? parts[2] : 'nn'}`} key={ey}>
                                            <div className={status}><p>{`${parts[2]==="nn" ? "": parts[2].toUpperCase()}`}</p></div>
                                        </td>
                                        )
                                    })}

                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            {/* <Table bordered={true} onClick={props.selected}>
                <thead>
                    <th></th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                </thead>
                <tbody>
                    <tr>
                        <td>A</td>
                        <td className='A-1'></td>
                        <td className='A-2'></td>
                        <td className='A-3'></td>
                        <td className='A-4'></td>
                        <td className='A-5'></td>
                        <td className='A-6'></td>
                        <td className='A-7'></td>
                        <td className='A-8'></td>
                        <td className='A-9'></td>
                        <td className='A-10'></td>
                    </tr>
                    <tr>
                        <td>B</td>
                        <td className='B-1'></td>
                        <td className='B-2'></td>
                        <td className='B-3'></td>
                        <td className='B-4'></td>
                        <td className='B-5'></td>
                        <td className='B-6'></td>
                        <td className='B-7'></td>
                        <td className='B-8'></td>
                        <td className='B-9'></td>
                        <td className='B-10'></td>
                    </tr>
                    <tr>
                        <td>C</td>
                        <td className='C-1'></td>
                        <td className='C-2'></td>
                        <td className='C-3'></td>
                        <td className='C-4'></td>
                        <td className='C-5'></td>
                        <td className='C-6'></td>
                        <td className='C-7'></td>
                        <td className='C-8'></td>
                        <td className='C-9'></td>
                        <td className='C-10'></td>
                    </tr>
                    <tr>
                        <td>D</td>
                        <td className='D-1'></td>
                        <td className='D-2'></td>
                        <td className='D-3'></td>
                        <td className='D-4'></td>
                        <td className='D-5'></td>
                        <td className='D-6'></td>
                        <td className='D-7'></td>
                        <td className='D-8'></td>
                        <td className='D-9'></td>
                        <td className='D-10'></td>
                    </tr>
                    <tr>
                        <td>E</td>
                        <td className='E-1'></td>
                        <td className='E-2'></td>
                        <td className='E-3'></td>
                        <td className='E-4'></td>
                        <td className='E-5'></td>
                        <td className='E-6'></td>
                        <td className='E-7'></td>
                        <td className='E-8'></td>
                        <td className='E-9'></td>
                        <td className='E-10'></td>
                    </tr>
                    <tr>
                        <td>F</td>
                        <td className='F-1'></td>
                        <td className='F-2'></td>
                        <td className='F-3'></td>
                        <td className='F-4'></td>
                        <td className='F-5'></td>
                        <td className='F-6'></td>
                        <td className='F-7'></td>
                        <td className='F-8'></td>
                        <td className='F-9'></td>
                        <td className='F-10'></td>
                    </tr>
                    <tr>
                        <td>G</td>
                        <td className='G-1'></td>
                        <td className='G-2'></td>
                        <td className='G-3'></td>
                        <td className='G-4'></td>
                        <td className='G-5'></td>
                        <td className='G-6'></td>
                        <td className='G-7'></td>
                        <td className='G-8'></td>
                        <td className='G-9'></td>
                        <td className='G-10'></td>
                    </tr>
                    <tr>
                        <td>H</td>
                        <td className='H-1'></td>
                        <td className='H-2'></td>
                        <td className='H-3'></td>
                        <td className='H-4'></td>
                        <td className='H-5'></td>
                        <td className='H-6'></td>
                        <td className='H-7'></td>
                        <td className='H-8'></td>
                        <td className='H-9'></td>
                        <td className='H-10'></td>
                    </tr>
                    <tr>
                        <td>I</td>
                        <td className='I-1'></td>
                        <td className='I-2'></td>
                        <td className='I-3'></td>
                        <td className='I-4'></td>
                        <td className='I-5'></td>
                        <td className='I-6'></td>
                        <td className='I-7'></td>
                        <td className='I-8'></td>
                        <td className='I-9'></td>
                        <td className='I-10'></td>
                    </tr>
                    <tr>
                        <td>J</td>
                        <td className='J-1'></td>
                        <td className='J-2'></td>
                        <td className='J-3'></td>
                        <td className='J-4'></td>
                        <td className='J-5'></td>
                        <td className='J-6'></td>
                        <td className='J-7'></td>
                        <td className='J-8'></td>
                        <td className='J-9'></td>
                        <td className='J-10'></td>
                    </tr>
                </tbody>
            </Table> */}

        </div>
    )
}

export default TableroView
