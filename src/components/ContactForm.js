import React, {useEffect, useState} from 'react';

const ContactForm = (props) => {
    const initialFieldValues = {
        fullName: '',
        mobile: '',
        email: '',
        address: ''

    }
    const emptyObj = {
        fullName: '',
        mobile: '',
        email: '',
        address: ''
    }
    const [values, setValues] = useState(initialFieldValues)

    useEffect(()=> {
            if (props.currentId == ''){
                setValues({
                    ...initialFieldValues
                })
            }
            else {
                setValues({
                    ...props.contactObj[props.currentId]
                })
            }
    }, [props.currentId, props.contactObj])

    const submitHandler = (e) => {
        e.preventDefault()
        props.addOrEdit(values)
    }

    const inputChangeHandler = (e) => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    return (
        <>
            <form onSubmit={submitHandler} className='mb-sm-4'>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-user-alt"></i>
                                    </span>
                        </div>
                        <input onChange={inputChangeHandler} name='fullName' type="text" className="form-control" placeholder="Full Name" value={values.fullName}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-mobile-alt"></i>
                                    </span>
                        </div>
                        <input onChange={inputChangeHandler} name='mobile' type="number" className="form-control" placeholder="Mobile" value={values.mobile}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="far fa-envelope"></i>
                                    </span>
                        </div>
                        <input onChange={inputChangeHandler} name='email' type="text" className="form-control" placeholder="Email" value={values.email}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-group">
                        <textarea onChange={inputChangeHandler} name='address' className="form-control" name="address" rows="3" placeholder='Address' value={values.address}></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">{
                    props.currentId ? 'Update': 'Save'
                }</button>
            </form>
        </>
    );
};

export default ContactForm;
