import { useFormik } from "formik";
import { validateIsFilled, validateMaxLength } from "../util/Validator";
import { useState } from 'react'

const AddFlyPage = () => {

    const [imageURL, setImageURL] = useState()

    const addFlyToDB = async (data) => {
        //have to use formdata object instead of just enctype
        const formData = new FormData()
        for(const name in data) {
            formData.append(name, data[name])
        };

        const res = await fetch(process.env.REACT_APP_API_URL + '/flies/', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
    }

    const validate = values => {
        let errors = {};
        // errors = {...validateFlyName(values.name), ...errors}
        errors = {...validateIsFilled(['name', 'description'] , values), ...errors}
        errors = {...validateMaxLength('name', values, 60), ...errors}
        console.log(errors)
        return errors
    }

    const formik = useFormik({
        initialValues: {
        name: '',
        description: '',
        image: ''
    },
    onSubmit: values => {
        addFlyToDB(values)
    },
    validate
    })


    return (
        <section className="rounded-box full-box styled-scrollbar">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <div className="form-row">
                    <h3>Name</h3>
                    <input id="name" name="name" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}/>
                    {formik.touched.name && formik.errors.name ? (
                        <div className='form-error'>{formik.errors.name}</div>
                    ): null}
                </div>
                <div className="form-row">
                    <h3>Description</h3>
                    <input id="description" name="description" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description}/>
                    {formik.touched.description && formik.errors.description ? (
                        <div className='form-error'>{formik.errors.description}</div>
                    ): null}
                </div>
                <div className="form-row">
                    {imageURL && <img src={imageURL}></img>}
                    <h3>Image</h3>
                    <input id="image" name="image" type="file" accept='image/*' onChange={(e) => {
                        setImageURL(URL.createObjectURL(e.target.files[0]))
                        //formik doesnt natively handle file upload so you need to manually change the field value in formik
                        formik.setFieldValue("image", e.target.files[0])
                    }}/>
                    {formik.touched.description && formik.errors.description ? (
                        <div className='form-error'>{formik.errors.description}</div>
                    ): null}
                </div>

                <button className="btn" type="submit">Submit</button>
            </form>
        </section>
    )
}

export default AddFlyPage;