import { URL } from "./constants";

export const requestRegister = async (firstname, lastname, email, grad_year, school, township, password, password2) => {
    let request = { method: "POST" };
    let info = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        grad_year: grad_year,
        school: school,
        township: township,
        username: email,
        password: password,
        password2: password2
    }
    request.body = JSON.stringify(info);
    let data = await fetch(`${URL}/register/`, {
        ...request,
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    });

    var response = await data.json();
    return response;
}

export const requestLogin = async (username, password) => {
    let request = { method: "POST" };
    let info = {
        username: username,
        password: password
    }
    request.body = JSON.stringify(info);
    let data = await fetch(`${URL}/login/`, {
        ...request,
        headers: new Headers({
            "Content-Type": "application/json",
        }),
    });

    var response = await data.json();
    return response;
}

export const request = async ({ type: reqType, path: url, body: body }) => {
    let type = reqType ? reqType : body ? "POST" : "GET";
    let req = { method: type };
    let data;

    if (reqType === "POST" || reqType === "PATCH") {
        if (body) {
            req.body = JSON.stringify(body);
        }

        data = await fetch(`${URL}/${url}`, {
            ...req,
            // token authentication 
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            },
        }).catch((error) => {
            console.log(error);
        });
    }
    else {
        data = await fetch(`${URL}/${url}`, {
            ...req,
            // token authentication 
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            },
        }).catch((error) => {
            console.log(error);
        });
    }
    var response = await data.json();
    return response;
}

// export const formRequest = async ({ type: reqType, path: url, body: body }) => {
//     let type = reqType ? reqType : body ? "POST" : "GET";
//     let req = { method: type };
//     let data;

//     if (reqType === "POST" || reqType === "PATCH") {
//         if (body) {
//             req.body = body;
//         }

//         console.log(req.body);

//         data = await fetch(`${URL}/${url}`, {
//             ...req,
//             // token authentication 
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 "X-Requested-With": "XMLHttpRequest",
//                 'Authorization': `Token ${localStorage.getItem('token')}`,
//             },
//         });
//     }
//     else {
//         data = await fetch(`${URL}/${url}`, {
//             ...req,
//             // token authentication 
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 "X-Requested-With": "XMLHttpRequest",
//                 'Authorization': `Token ${localStorage.getItem('token')}`
//             },
//         });
//     }
//     // var response = await data.json();
//     return data;
// }