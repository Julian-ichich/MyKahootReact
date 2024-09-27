import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export const KahootContext = createContext()

const KahootProvider = ({ children }) => {
    //uso del layoutAdmin
    const [mostrar, setMostrar] = useState()
    useEffect(() => {
        setMostrar(JSON.parse(localStorage.getItem('tests')))
    }, [])

    const CopyLink = (code) => {
        navigator.clipboard.writeText(`${window.location}game/${code}`)
    }


    //estados del create test
    const navigate = useNavigate()
    const [preguntas, setPreguntas] = useState([])
    const [show, setShow] = useState(false);
    const [preguntaId, setPreguntasId] = useState(1)
    const [activate, setActivate] = useState({ respuesta1: true, respuesta2: true, respuesta3: true, respuesta4: true })
    const { register, control, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm({
        defaultValues: {
            pregunta: '',
            respuesta1: '',
            respuesta2: '',
            respuesta3: '',
            respuesta4: '',
            respuestaCorrecta: '',
            autor: '',
            time: '',
            nombreTest: ''
        }
    })

    const handleClose = () => {
        setShow(false)
        setActivate({
            respuesta1: true, respuesta2: true, respuesta3: true, respuesta4: true
        })

        reset({
            pregunta: '',
            respuesta1: '',
            respuesta2: '',
            respuesta3: '',
            respuesta4: '',
            respuestaCorrecta: ''
        })
    };

    const handleShow = () => setShow(true);

    const onSubmit = (data) => {

        if (getValues('respuestaCorrecta')) {
            const { autor, time, nombreTest, ...dataFilter } = data
            dataFilter.id = preguntaId
            setPreguntas([...preguntas, dataFilter])
            setPreguntasId(preguntaId + 1)
            handleClose()

        }
    }

    const actualizarRespuestaCorrecta = (name) => {
        setValue('respuestaCorrecta', getValues(name))
    }

    const handleDelete = (index) => {
        const filter = preguntas.filter(element => element.id != index)
        setPreguntas(filter)
    }

    const onChangeText = (event, onChange, name) => {
        if (event.target.value != '') {
            activate[name] = false
            setActivate({ ...activate })
        } else {
            activate[name] = true
            setActivate({ ...activate })
        }

        onChange(event.target.value)
    }

    const handleCreateTest = (data) => {
        
        const { autor, time, nombreTest } = data
        if (preguntas.length <= 0) {
            alert('agrega las preguntas del examen')
        } else {
            const guardar = ({ codigo: Math.random().toString(36).substring(2, 9), autor, time, nombreTest, preguntas })

            const tests = JSON.parse(localStorage.getItem('tests'))
            if (tests) {
                tests.push(guardar)
                localStorage.setItem('tests', JSON.stringify(tests))
                setMostrar(tests)
            } else {
                localStorage.setItem('tests', JSON.stringify([guardar]))
                setMostrar(tests)
            }
            reset()
            setPreguntas([])
            alert('se ha guardado con exito')
            navigate('/')
        }
    }



    return (
        <KahootContext.Provider value={{
            mostrar,
            preguntas,
            setPreguntas,
            show,
            setShow,
            preguntaId, 
            setPreguntasId,
            activate, 
            setActivate,
            register, 
            control, 
            handleSubmit, 
            setValue, 
            getValues, 
            errors,
            reset, 
            handleClose,
            handleShow,
            onSubmit,
            actualizarRespuestaCorrecta,
            handleDelete,
            onChangeText,
            handleCreateTest,
            CopyLink
   
        }}>
            {children}
        </KahootContext.Provider>
    );
}

export default KahootProvider;