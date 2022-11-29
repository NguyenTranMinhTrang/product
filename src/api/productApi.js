import axiosInstance from "./axiosInstance";

export const getProductList = async () => {
    const data = await axiosInstance.get("/")
        .then((response) => {
            console.log("1.1: ", new Date());
            if (response.status == 200) {
                return {
                    code: 1,
                    data: response.data
                };
            }
            else {
                return {
                    code: 0,
                    data: response.data
                };
            }
        })
        .catch((error) => {
            return {
                code: 0,
                data: error
            };
        });
    return data;
}

export const getCategories = async () => {
    const data = await axiosInstance.get("/categories")
        .then((response) => {
            if (response.status == 200) {
                return {
                    code: 1,
                    data: response.data
                };
            }
            else {
                return {
                    code: 0,
                    data: response.data
                };
            }
        })
        .catch((error) => {
            return {
                code: 0,
                data: error
            };
        })
    return data;
}

export const postProduct = (addProduct) => {
    return axiosInstance.post("", addProduct)
        .then((response) => {
            if (response.status == 200) {
                return {
                    code: 1,
                    data: response.data
                }
            }
            else {
                return {
                    code: 0,
                    data: response.data
                }
            }
        })
        .catch((error) => {
            return {
                code: 1,
                data: error
            }
        })
}