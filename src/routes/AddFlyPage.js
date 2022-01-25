import { useFormik } from "formik";
import { validateIsFilled, validateMaxLength } from "../util/Validator";


const AddFlyPage = () => {

    const addFlyToDB = async (fly) => {
        const res = await fetch(process.env.REACT_APP_API_URL + '/add-fly', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: fly.name,
                description: fly.description,
            })
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
        description: ''

    },
    onSubmit: values => {
        addFlyToDB(values)
    },
    validate
    })

    return (
        <section className="rounded-box full-box styled-scrollbar">
            <form onSubmit={formik.handleSubmit}>
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
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default AddFlyPage;