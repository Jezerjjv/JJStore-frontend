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
            console.log("hola");
            return data;
        }).then(data => {
            return data.status;
        })
}

export const DeleteProducto = (id) => {

}

export const SaveProduct = async (product) => {
    fetch(`${process.env.REACT_APP_API}product/save`, product)
        .then(data => {
            if (data.status === 200) {
                window.location.reload();
            }
        })
        .catch(erro => {
            return erro
        })
}