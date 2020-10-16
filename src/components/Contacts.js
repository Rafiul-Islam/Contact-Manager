import React, {useEffect, useState} from 'react';
import ContactForm from "./ContactForm";
import fireDb from '../db-service/Firebase'

const Contacts = () => {

    const [contactObj, setContactObj] = useState({})
    const [currentId, setCurrentId] = useState('')

    useEffect(() => {
        fireDb.child('contact').on('value', snapshot => {
            if (snapshot.val() != null)
                setContactObj({...snapshot.val()})
            else {
                setContactObj({})
            }
        })
    }, [])

    const addOrEdit = (obj) => {
        if (!currentId) {
            fireDb.child('contact').push(
                obj,
                error => {
                    if (error)
                        console.log(error)
                    else
                        setCurrentId('')
                }
            )
        } else {
            fireDb.child(`contact/${currentId}`).set(
                obj,
                error => {
                    if (error)
                        console.log(error)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('do you want to delete this?')){
            fireDb.child(`contact/${id}`).remove(
                error => {
                    if (error)
                        console.log(error)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Contact Manager</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 offset-md-1 text-left">
                    <ContactForm {...({addOrEdit, currentId, contactObj})}/>
                </div>
                <div className="col-md-6">
                    <table className="table table-bordered">
                        <thead>
                        <tr className='table-primary'>
                            <th scope="col">Full Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(contactObj).map((id) =>
                                <tr key={id}>
                                    <td>{contactObj[id].fullName}</td>
                                    <td>{contactObj[id].mobile}</td>
                                    <td>{contactObj[id].email}</td>
                                    <td>{contactObj[id].address}</td>
                                    <td>
                                        <i className="fas fa-edit text-primary" style={{cursor: "pointer"}}
                                           onClick={() => {
                                               setCurrentId(id)
                                           }}></i>
                                        <i className="fas fa-trash ml-4 text-danger" style={{cursor: "pointer"}}
                                           onClick={() => {
                                               deleteHandler(id)
                                           }}></i>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
