import { createContext, useEffect, useState } from "react";
export const KahootClienteContext = createContext()

const KahootClienteProvider = ({ children }) => {

    //todo lo usado en starGame
    const [count, setCount] = useState(3)
    const [show, setShow] = useState(true)
    function myCallback() {
        setCount(count - 1)
    }

    //todo lo usado en MostrarPregunta
    const [preguntas, setPreguntas] = useState(JSON.parse(localStorage.getItem('tests')))
    const [test, setTest] = useState()
    const [index, setIndex] = useState(0)
    const [respuestasCorrectas, setRespuestasCorrectas] = useState(0)
    const [respuestasIncorrectas, setRespuestasIncorrectas] = useState(0)
    const [showResults, setShowResults] = useState(false)
    const adelante = () => {
        if (index < test.preguntas.length - 1) {
            setIndex(index + 1)
        } else if (index == test.preguntas.length - 1) {
            setShowResults(true)
        }
    }

    const verificarRespuesta = (value) => {
        if (test?.preguntas[index]?.respuestaCorrecta == value) {
            setRespuestasCorrectas(respuestasCorrectas + 1)
        } else {
            setRespuestasIncorrectas(respuestasIncorrectas + 1)
        }

        adelante()
    }

    //todo lo usado en el temporizador
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(59)
    function play() {
        setSeconds(seconds - 1)
    }

    //todo lo usado en layoutCliente
    const [notFound, setNotFound] = useState(false)
    const [testLayout, setTestLayout] = useState({})

    return (
        <KahootClienteContext.Provider value={{
            count,
            setCount,
            show,
            setShow,
            myCallback,
            preguntas,
            setPreguntas,
            test,
            setTest,
            index,
            setIndex,
            respuestasCorrectas,
            setRespuestasCorrectas,
            respuestasIncorrectas,
            setRespuestasIncorrectas,
            showResults,
            setShowResults,
            adelante,
            verificarRespuesta,
            hours,
            setHours,
            minutes,
            setMinutes,
            seconds,
            setSeconds,
            play,
            notFound,
            setNotFound,
            testLayout,
            setTestLayout
        }}>
            {children}
        </KahootClienteContext.Provider>
    );
}

export default KahootClienteProvider;