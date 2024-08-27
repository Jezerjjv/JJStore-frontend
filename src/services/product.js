import { useSWR_API } from "../componets/useSWR_API";

export const GetProducts = () => {
    return useSWR_API(`${process.env.REACT_APP_API}products`);
}

export const GetAllProducts = () => {
    return useSWR_API(`${process.env.REACT_APP_API}allproducts`);
}

export const GetProductById = (id) => {
    return useSWR_API(`${process.env.REACT_APP_API}product/${id}`);
}

export const EnabledProduct = (id, isEnabled) => {
    return fetch(`${process.env.REACT_APP_API}product/enabled/${id}`, isEnabled)
        .then(data => {
            return data;
        }).then(data => {
            return data.status;
        })
}

export const DeleteProducto = (id) =>{
    
}

export const SaveProduct = (product) => {
    fetch(`${process.env.REACT_APP_API}product/save`, product)
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