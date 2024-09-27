import { useContext, useEffect, useState } from "react";
import './index.css'
import { KahootClienteContext } from "../../context/contextCliente";
const Temporizador = () => {
    const { hours, setHours, minutes, setMinutes, seconds, setSeconds, setShowResults, play, test } = useContext(KahootClienteContext)

    useEffect(() => {
        const horas = parseInt(test?.time / 60)
        const minutos = parseInt(test?.time - (horas * 60))
        setHours(minutos == 0 ? horas - 1 : horas)
        setMinutes(minutos == 0 ? 59 : minutos - 1)
    }, [test])

    useEffect(() => {
        if (seconds > -1) {
            var intervalID = setInterval(play, 1000)
            setTimeout(() => {
                clearInterval(intervalID)
            }, 1000)
        } else if (minutes > 0) {
            setMinutes(minutes - 1)
            setSeconds(59)
        } else if (hours > 0) {
            setHours(hours - 1)
            setMinutes(59)
            setSeconds(59)
        } else {
            setShowResults(true)
        }
    }, [seconds])

    return (
        <div>

            <div className="hourglassBackground">
                <div className="hourglassContainer">
                    <div className="hourglassCurves"></div>
                    <div className="hourglassCapTop"></div>
                    <div className="hourglassGlassTop"></div>
                    <div className="hourglassSand"></div>
                    <div className="hourglassSandStream"></div>
                    <div className="hourglassCapBottom"></div>
                    <div className="hourglassGlass"></div>
                </div>
            </div>
            <div className="w-100 d-flex justify-content-center">
                <p className="w-25 text-center fs-1 text-white bg-black rounded-5 p-2">{`${hours}  :  ${minutes}  :  ${seconds}`}</p>
            </div>

        </div>
    );
}

export default Temporizador;