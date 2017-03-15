export function setName(name) {
    // return dispatch => {
    //     setTimeout(()=>{
    //         dispatch({
    //             type: "SET_NAME",
    //             payload: name
    //         })
    //     }, 3000);
    // };

    return {
        type: "SET_NAME",
        payload: new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(name);
            }, 2000)
        })
    }
}

export function subtractNumber(age) {
    return {
        type: "SUBTRACT",
        payload: age
    };
}