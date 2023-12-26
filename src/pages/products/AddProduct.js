import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {add} from "../../redux/services/productService";
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
function AddProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/categories')
            .then((response) => {
                setCategories(response.data);
            })
    },[])

    // const addForm = () => {
    //     let newProduct = {
    //         name: '',
    //         description: '',
    //         image: '',
    //         price: '',
    //         category: {
    //             id: ''
    //         }
    //     }
    //     dispatch(add(newProduct)).then(() => {
    //         navigate('/products/home');
    //     })
    // }
    return (
        <>
            <h1> ADD </h1>
            <Formik initialValues={{
                name: '',
                description: '',
                image: '',
                price: '',
                category: {
                    id: ''
                },
            }}
                    onSubmit={(values) => {
                        dispatch(add(values)).then(() =>{
                            navigate('/products/home')
                        });
                    }}
                    >
                <Form>
                    <Field name={"name"} placeholder={"Name"}/>
                    <Field name={"description"} placeholder={"Description"}/>
                    <Field name={"image"} placeholder={"Image"}/>
                    <Field name={"price"} placeholder={"Price"}/>
                    <Field name={"category.id"} type={"text"} as={"select"}>
                    {
                        categories.map((category, index) => {
                            return (
                                <option key={index} value={category.id}>{category.name}</option>
                            )
                    })
                    }
                    </Field>
                    <button>Them moi</button>
                </Form>
            </Formik>
        </>
    )
}

export default AddProduct;