import React, { useState } from 'react'
import { navigate } from "@reach/router";
import { Button, Form } from 'react-bootstrap';

const HomeView = () => {
    const [nombre, setNombre] = useState('');

    const jugar =async  () => {
        //navigate("/jugar", { state: { nombre: nombre } })
        navigate('jugar')
    }
    
    return (
        <div>
            <h1>Home</h1>
            <Form onSubmit={jugar}>
                <label>
                    Nombre:
                        <input type="text" name="nombre" onChange={(event) => setNombre(event.target.value)} />
                </label>
                <Button variant="primary" type="submit">
                    Jugar
                    </Button>
            </Form>
        </div>
    )

}
export default HomeView