import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {edit, getById} from "../../redux/services/productService";
import {useDispatch, useSelector} from "react-redux";

export function EditProduct() {
    const productEdit = useSelector(({products}) => {
        return products.productEdit;
    });
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getById(id))
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/categories')
            .then((response) => {
                setCategories(response.data);
            })
    }, [])

    return (
        <>
        <h1>Edit Product</h1>
        <Formik
        initialValues={productEdit}

        onSubmit={(values) => {
            dispatch(edit(values)).then(() =>{
                navigate('/products/home');
            })
        }}
        enableReinitialize={true}
        >
        <Form>
            <Field name={"id"} placeholder={"Id"}/>
            <Field name={"name"} placeholder={"Name"}/>
            <Field name={"description"} placeholder={"Description"}/>
            <Field name={"image"} placeholder={"Image"}/>
            <Field name={"price"} placeholder={"Price"}/>
            <Field name={"category.id"} placeholder={"Category"} type={"text"} as={"select"}>
                {
                    categories.map((category, index) => {
                        return (
                            <option key={index} value={category.id}>{category.name}</option>
                        )
                    })
                }
            </Field>
            <button>Edit</button>
        </Form>
        </Formik>
</>
)
}