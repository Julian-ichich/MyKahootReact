import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { KahootContext } from '../../context/context';


const LayoutAdmin = () => {
    const { mostrar, CopyLink, setMostrar, handleDeleteExam } = useContext(KahootContext)

    useEffect(() => { 
        setMostrar(JSON.parse(localStorage.getItem('tests')))
    },[])

    return (
        <>
            <div className='container pt-5'>
                <div className='container d-flex justify-content-end'>
                    <Link className='btn  btn-outline-primary' to={'/create'}>
                    <i className="bi bi-file-earmark-plus-fill me-1"></i>
                        Crear Test
                    </Link>

                </div>
                <div className='container d-flex flex-column justify-content-center bg-black pt-1 mt-1'>

                    <Table  responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre de la prueba</th>
                                <th>Duracion</th>
                                <th>Autor</th>
                                <th>Total preguntas</th>
                                <th>Codigo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mostrar?.map((examen, index) => (
                                    <tr key={examen.codigo}>
                                        <td>{index}</td>
                                        <td>{examen.nombreTest}</td>
                                        <td>{examen.time}</td>
                                        <td>{examen.autor}</td>
                                        <td>{examen.preguntas.length}</td>
                                        <td>{examen.codigo}</td>
                                        <td> <Button onClick={() => CopyLink(examen.codigo)} variant="outline-success"><i className="bi bi-copy me-1"></i>Copy link</Button>{' '} <Button onClick={() => handleDeleteExam(examen.codigo)} variant="outline-danger"><i className="bi bi-trash3-fill me-1" ></i>Delete</Button>{' '} </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </Table>

                </div>
            </div>

        </>
    );
}

export default LayoutAdmin;