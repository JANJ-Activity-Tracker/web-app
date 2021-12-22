import { URL } from "./constants";

export const requestRegister = async (firstname, lastname, email, grade, school, township, password, password2) => {
    let request = { method: "POST" };
    let info = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        grade: grade,
        school: school,
        township: township,
        username: email,
        password: password,
        password2: password2,
        profile_image: null
    }
    request.body = JSON.stringify(info);
    let data = await fetch(`${URL}/register/`, {
        ...request,
        headers: new Headers({
            "Content-Type": "application/json",
        }),
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
            },
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
            },
        });
    }

    var response = await data.json();
    return response;
}