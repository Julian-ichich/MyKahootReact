import { useContext, useState,useEffect } from 'react';
import { Col, Form, Modal, Row, Table, Button, InputGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import InputRespuesta from '../../components/InputRespuesta/InputRespuesta';
import { Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { KahootContext } from '../../context/context';

const CreateTest = () => {
    const {handleCreateTest, onChangeText ,handleDelete ,actualizarRespuestaCorrecta ,onSubmit, mostrar, preguntas, setPreguntas, show, setShow, activate, setActivate, register, control, handleSubmit, setValue, getValues, errors, reset, handleClose, handleShow } = useContext(KahootContext)
    
   
    return (
        <>
            <Container>
                <h1 className='text-center'>Crear una Evaluacion</h1>
                <Button variant="success" className='me-3' >
                    <NavLink to={'/'} className='list-group-item'>
                    <i className="bi bi-house-door-fill me-1"></i>
                        Home
                    </NavLink>
                </Button>
                <Form className='mt-5'>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nombre del test</Form.Label>
                                <Form.Control {...register('nombreTest', { required: 'este campo es obligatorio' })} type="text" placeholder="Nombre del test" />
                                <Form.Text className="text-muted">
                                    <p className='text-danger'>{errors.nombreTest?.message}</p>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nombre del autor</Form.Label>
                                <Form.Control {...register('autor', { required: 'este campo es obligatorio' })} type="text" placeholder="Nombre del autor" />
                                <Form.Text className="text-muted">
                                    <p className='text-danger'>{errors.autor?.message}</p>
                                </Form.Text>
                                {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>{`Duracion del test `}
                                    <Form.Text className="text-muted">
                                        (Ingreselo en minutos)
                                    </Form.Text>
                                </Form.Label>
                                <Form.Control {...register('time', { required: 'este campo es obligatorio en numeros', min: { value: 1, message: 'tiene que ser mayor a 0' } })} type="number" placeholder="Duracion del test" />
                                <Form.Text className="text-muted">
                                    <p className='text-danger'>{errors.time?.message}</p>
                                </Form.Text>
                                {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                <Row>
                    <Col>
                        <Row>
                            <Col className='d-flex justify-content-end mb-2'>
                                <Button variant="success" className='me-3' onClick={handleSubmit(handleCreateTest)} >
                                <i className="bi bi-floppy-fill me-1"></i>
                                    Guardar cambios

                                </Button>
                                <Button variant="primary" onClick={handleShow}>
                                <i className="bi bi-file-earmark-plus-fill me-1"></i>
                                    Crear Pregunta
                                </Button>
                            </Col>


                        </Row>

                        <Table bordered responsive='true'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Pregunta</th>
                                    <th>Respuestas</th>
                                    <th>Respuesta correcta</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {preguntas.map((pregunta) => (
                                    <tr key={pregunta.id}>
                                        <td>{pregunta.id}</td>
                                        <td>{pregunta.pregunta}</td>
                                        <td>{`${pregunta.respuesta1} === ${pregunta.respuesta2} === ${pregunta.respuesta3} === ${pregunta.respuesta4}`}</td>
                                        <td>{pregunta.respuestaCorrecta}</td>
                                        <td>
                                            <Button variant="outline-danger" onClick={() => handleDelete(pregunta.id)}><i className="bi bi-trash3-fill me-1"></i>Eliminar</Button>{' '}
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </Table>

                    </Col>
                </Row>



                <Modal show={show} onHide={handleClose} responsive='true'>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Pregunta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Pregunta</Form.Label>

                                <Controller
                                    name='pregunta'
                                    control={control}
                                    rules={{
                                        required: "Este campo es obligatorio",

                                    }}
                                    render={({ field }) => (
                                        <Form.Control
                                            type="text"
                                            placeholder="ingrese la pregunta"
                                            autoFocus
                                            {...field}
                                        />
                                    )}
                                />
                                <p className='text-danger'>{errors.pregunta?.message}</p>
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Respuesta 1:</Form.Label>
                                <Controller
                                    name={'respuesta1'}
                                    control={control}
                                    rules={{
                                        required: "Este campo es obligatorio",

                                    }}

                                    render={({ field: { onChange, name, ref } }) => {
                                        return (
                                            <InputRespuesta
                                                activate={activate[name]}
                                                onChange={(e) => onChangeText(e, onChange, name)}
                                                inputRef={ref}
                                                control={control}
                                                name={name}
                                                onChangeTwo={() => actualizarRespuestaCorrecta(name)}
                                                nameRadio='respuestaCorrecta'

                                            />
                                        )
                                    }}
                                />
                                <p className='text-danger'>{errors.respuesta1?.message}</p>
                                {/* <InputRespuesta nameControl={'respuesta1'} nameOption={'respuesta'}/> */}
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Respuesta 2:</Form.Label>
                                <Controller
                                    name={'respuesta2'}
                                    control={control}
                                    rules={{
                                        required: "Este campo es obligatorio",

                                    }}
                                    render={({ field: { onChange, name, ref } }) => {
                                        return (
                                            <InputRespuesta
                                                activate={activate[name]}
                                                onChange={(e) => onChangeText(e, onChange, name)}
                                                inputRef={ref}
                                                control={control}
                                                name={name}
                                                onChangeTwo={() => actualizarRespuestaCorrecta(name)}
                                                nameRadio='respuestaCorrecta'
                                            />
                                        )
                                    }}
                                />
                                <p className='text-danger'>{errors.respuesta2?.message}</p>
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Respuesta 3:</Form.Label>
                                <Controller
                                    name={'respuesta3'}
                                    control={control}
                                    rules={{
                                        required: "Este campo es obligatorio",

                                    }}
                                    render={({ field: { onChange, name, ref } }) => {
                                        return (
                                            <InputRespuesta
                                                activate={activate[name]}
                                                onChange={(e) => onChangeText(e, onChange, name)}
                                                inputRef={ref}
                                                control={control}
                                                name={name}
                                                onChangeTwo={() => actualizarRespuestaCorrecta(name)}
                                                nameRadio='respuestaCorrecta'
                                            />
                                        )
                                    }}
                                />
                                <p className='text-danger'>{errors.respuesta3?.message}</p>
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Respuesta 4:</Form.Label>
                                <Controller
                                    name={'respuesta4'}
                                    control={control}
                                    rules={{
                                        required: "Este campo es obligatorio",

                                    }}
                                    render={({ field: { onChange, name, ref } }) => {
                                        return (
                                            <InputRespuesta
                                                activate={activate[name]}
                                                onChange={(e) => onChangeText(e, onChange, name)}
                                                inputRef={ref}
                                                control={control}
                                                name={name}
                                                onChangeTwo={() => actualizarRespuestaCorrecta(name)}
                                                nameRadio='respuestaCorrecta'
                                            />
                                        )
                                    }}
                                />
                                <p className='text-danger'>{errors.respuesta4?.message}</p>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>


            </Container >
        </>
    );
}

export default CreateTest;

// onClick={() => (reset({pregunta:'', respuesta1:''}))} 