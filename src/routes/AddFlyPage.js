import { useFormik } from "formik";
import { validateIsFilled, validateMaxLength } from "../util/Validator";
import { useState, useEffect, useRef } from 'react'
import { getTags } from '../api/tags'
import { useNavigate } from "react-router-dom";
import ResponsiveSearch from "../components/ResponsiveSearch/ResponsiveSearch";
import Tag from "../components/Tag/Tag";
import FlyDisplay from "../components/FlyDisplay/FlyDisplay";
import useDidUpdateEffect from "../util/useDidUpdateEffect";

const AddFlyPage = () => {

    const [imageURL, setImageURL] = useState()
    const [tags, setTags] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [selectedVariant, setSelectedVariant] = useState(null)

    const navigate = useNavigate()

    const selectedTags = useRef(new Set())

    const valuesRef = useRef()

    const validate = values => {
        let errors = {};
        console.log(values)
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
        image: '',
        variant: ''
    },
    onSubmit: values => {
        addFlyToDB(values)
    },
    validate
    })

    useEffect(async () => {
        setTags(await getTags())
        // allTags = [...allTags, ...await getTags()]
    }, [])

    useDidUpdateEffect(() => {
        formik.setFieldValue("variant", selectedVariant.id)
    }, [selectedVariant])

    useEffect(() => {
        const storage = window.sessionStorage;
        if(storage.getItem('values')) {
            formik.setValues(JSON.parse(storage.getItem('values')))
        }

        return function cleanup() {
            console.log(valuesRef.current)
            if(valuesRef.current)
                storage.setItem('values', JSON.stringify(valuesRef.current))
        }
    }, [])

    useEffect(() => {
        valuesRef.current = formik.values
    }, [formik.values])

    const addFlyToDB = async (data) => {
        //have to use formdata object instead of just enctype
        const formData = new FormData()
        for(const name in data) {
            formData.append(name, data[name])
        };
        for(const tag of selectedTags.current) {
            formData.append('tags', tag.id)
        }
        // for(let value of formData.values()) {
        //     console.log(value)
        // }
        // console.log(formData.entries().fo)
        const results = await fetch(process.env.REACT_APP_API_URL + '/flies/', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        const res = await results.json()
        if(res.id) {
            window.sessionStorage.removeItem('values')
            valuesRef.current = null
            navigate('/flies')
        }
    }

    const handleVariantSearchClick = (fly) => {
        setSelectedVariant(fly)
        setSearchResults([])
    }

    return (
        <section className="center-box rounded-box full-box styled-scrollbar scrollable">
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
                <div className="form-row">
                    <div className=''>
                        {tags.map((tag, index) => <Tag text={tag.title} enabled={false} key={index} onToggle={e => {e ? selectedTags.current.add({title: tag.title, id: tag.id}) : selectedTags.current.delete({title: tag.title, id: tag.id})}}/>)}
                    </div>
                </div>
                <div className="form-row">
                    <h3>Variant</h3>
                    <ResponsiveSearch setSearchResults={setSearchResults}/>
                    <div className="rounded-box fly-grid" style={{gap: '12px'}}>
                        {searchResults.length ? searchResults.map((fly, index) => <FlyDisplay fly={fly} handleClick={() => handleVariantSearchClick(fly)} key={index}/>) : null}
                    </div>
                    <div style={{maxWidth: '400px'}}>
                        {selectedVariant ? <FlyDisplay fly={selectedVariant} handleClick={() => {}} className='no-interaction'/> : null}
                    </div>
                </div>
                <button className="btn text-large" type="submit">Submit</button>
            </form>
        </section>
    )
}

export default AddFlyPage;