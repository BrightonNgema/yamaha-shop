export const config = (token) => {
    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
}

export const errorConfig = (error) => {

    let response = {}
    if (!error.response) {

        response = { message: error.message }

    } else {
        if (error.response.status === 500) {
            response.message = "Server Error."
        } else {

            response = { message: error.response.data.message ? error.response.data.message : "Error occurred" }
        }
        if (error.response.status === 422) {
            response.error = error.response.data.errors
            response.message = error.response.data.message ? error.response.data.message : "Please check invalid data. "
        }
    }



    return response;
}

export const processPrice = (quantity, price) => {
    return parseInt(quantity) * parseFloat(price)
}

export const checks = (item) => {
    return item !== 'cart_total' && item !== 'formatted_cart_total' && item !== "uuid" && item !== "total_before_voucher_discount" && item !== "voucher_discount" && item !== "delivery" && item != 'formatted_total_before_voucher_discount' && item !== "voucher";
}
