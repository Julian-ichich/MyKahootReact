import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Temporizador from "../Temporizador/Temporizador";
import { KahootClienteContext } from "../../context/contextCliente";
import './index.css'
const MostrarPregunta = () => {

    const { verificarRespuesta, preguntas, test, setTest, index, respuestasCorrectas, respuestasIncorrectas, showResults } = useContext(KahootClienteContext)
    const { codigo } = useParams()
    useEffect(() => {
        const prueba = preguntas.find((item) => item.codigo == codigo)
        setTest(prueba)
    }, [])

    return (
        <>
            <Container>
                {
                    !showResults && (
                        <div>
                            <Temporizador />

                            <h1 className="text-center">{test?.preguntas[index]?.pregunta}</h1>
                            <Row className="d-flex  text-center gap-4">
                                <Col className="d-flex gap-5 justify-content-center" md={12}>
                                    <Button variant="primary" onClick={(e) => verificarRespuesta(e.target.value)} value={test?.preguntas[index]?.respuesta1} size="lg" style={{ width: "40%", height:150 }}>{test?.preguntas[index]?.respuesta1}</Button>
                                    <Button variant="danger" onClick={(e) => verificarRespuesta(e.target.value)} value={test?.preguntas[index]?.respuesta2} size="lg" style={{ width: "40%", height:150 }}>{test?.preguntas[index]?.respuesta2}</Button>
                                </Col>
                                <Col className="d-flex gap-5 justify-content-center" md={12}>
                                    <Button variant="warning" onClick={(e) => verificarRespuesta(e.target.value)} value={test?.preguntas[index]?.respuesta3} size="lg" style={{ width: "40%", height:150 }}>{test?.preguntas[index]?.respuesta3}</Button>
                                    <Button variant="info" onClick={(e) => verificarRespuesta(e.target.value)} value={test?.preguntas[index]?.respuesta4} size="lg" style={{ width: "40%", height:150 }}>{test?.preguntas[index]?.respuesta4}</Button>
                                </Col>

                            </Row>
                        </div>
                    )
                }


                {
                    showResults && (
                        <Row className="d-flex  text-center gap-4">

                            <Col md={12} className="d-flex gap-5 justify-content-center pt-5" >
                                <div class="cards">
                                <div class="card blue">
                                        <p class="tip">{`${respuestasCorrectas} respuestas correctas`}</p>
                                    </div>
                                    <div class="card red">
                                        <p class="tip">{`${respuestasIncorrectas} respuestas incorrectas`}</p>
                                    </div>
                                </div>
                            </Col>


                        </Row>
                    )
                }

            </Container>
        </>
    );
}

export default MostrarPregunta;