import {useDispatch, useSelector} from "react-redux";
import {getAll, remove} from "../../redux/services/productService";
import {useEffect} from "react";
import login from "../users/Login";
import {Link} from "react-router-dom";

export function ListProduct() {
    const dispatch = useDispatch();
    const listProduct = useSelector(({products}) => {
        // console.log(10)
        return products.list;
    });

    useEffect(() => {
        dispatch(getAll());
        console.log(2)
    }, [])

    const kickOut = (id) => {
        dispatch(remove(id))
    }
    return (
        <>
            <h1>List Product</h1>
            <table border={1}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    listProduct.map((product) => (
                        <>

                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td><img src={product.image} alt="" width={100}/></td>
                                <td>{product.price}</td>
                                <td>{product.category.name}</td>
                                <td>
                                    <Link to={'/products/edit/' + product.id}> <button>Sửa</button></Link>
                                    <button onClick={() => kickOut(product.id)}>Xóa</button>
                                </td>
                            </tr>
                        </>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}