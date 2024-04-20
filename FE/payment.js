const baseURL = 'http://localhost:5000'
//Token and headers
const token = localStorage.getItem("token")
var decoded = jwt_decode(token);
const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'authorization': `Hamada__${token}`,
}


$("#checkout").click(() => {
    const data = {
        products: [
            {
                productId: "642dd43f3817960a56f82bdd",
                quantity: 3
            },
            {
                productId: "642dd4513817960a56f82be2",
                quantity: 1
            }
        ],
        couponName: "c1234",
        address: "407 omer ibn khattab cairo",
        phone: "01142951602",
        paymentType: 'card'
    }
    axios({
        method: 'post',
        url: `${baseURL}/order`,
        data: data,
        headers
    }).then(function (response) {
        console.log({ response });
        const { message, url } = response.data
        if (message == "Done") {
            console.log({ url });
            window.location = url
        }
    }).catch(function (error) {
        console.log(error);
    });

})
