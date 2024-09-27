import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { KahootClienteContext } from "../../context/contextCliente";
import './index.css'

const LayoutCliente = () => {
    const { preguntas, notFound, setNotFound, testLayout, setTestLayout } = useContext(KahootClienteContext)
    const { codigo } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const prueba = preguntas.find((item) => item.codigo == codigo)
        if (!prueba) {
            setNotFound(true)
        } else {
            setTestLayout(prueba)
        }


    }, [])

    const start = () => {
        navigate(`/game/${codigo}/start`)
    }



    return (
        <>

            {
                notFound && <h1>test no encontrado</h1>
            }
            {
                !notFound && <div className="d-flex justify-content-center pt-5">
                    <div className="brutalist-card">
                        <div className="brutalist-card__header">
                            <div className="brutalist-card__icon">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="brutalist-card__alert">Examen</div>
                        </div>
                        <div className="brutalist-card__message">
                            <h1>welcome to kahoot chango!</h1>
                            <p>the autor game is : {testLayout?.autor} </p>
                            <p>Time to take test: {`${testLayout?.time} minutos`}</p>
                            <p>Total questions in test: {testLayout.preguntas?.length} </p>
                        </div>
                        <div className="brutalist-card__actions">
                            <Button className="brutalist-card__button brutalist-card__button--read" variant="danger" onClick={start}> Start</Button>
                        </div>
                    </div>


                </div>
            }

        </>
    );
}

export default LayoutCliente;
