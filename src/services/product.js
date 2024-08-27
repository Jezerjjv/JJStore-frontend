import { useSWR_API } from "../componets/useSWR_API";

export const GetProducts = () => {
    return useSWR_API("http://localhost:3977/products");
}

export const GetAllProducts = () => {
    return useSWR_API("http://localhost:3977/allproducts");
}

export const GetProductById = (id) => {
    return useSWR_API(`http://localhost:3977/product/${id}`);
}

export const EnabledProduct = (id, isEnabled) => {
    return fetch(`http://localhost:3977/product/enabled/${id}`, isEnabled)
        .then(data => {
            return data;
        }).then(data => {
            return data.status;
        })
}

export const DeleteProducto = (id) =>{
    
}

export const SaveProduct = (product) => {
    fetch(`http://localhost:3977/product/save`, product)
        .then(data => {
            return data.json();
        }).then(data => {
            if (data.code === 201) window.location.reload();
        })
        .catch(erro => {
            this.setState({
                error: true
            })
        })
}