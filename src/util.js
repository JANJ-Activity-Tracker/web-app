import { URL } from "./constants";

export const requestRegister = async (firstname, lastname, email, grade, school, username, password, password2) => {
    let request = { method: "POST" };
    let info = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        grade: grade,
        school: school,
        username: username,
        password: password,
        password2: password2
    }
    request.body = JSON.stringify(info);
    let data = await fetch(`${URL}register/`, {
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
    let data = await fetch(`${URL}login/`, {
        ...request,
        headers: new Headers({
            "Content-Type": "application/json",
        }),
    });

    var response = await data.json();
    return response;
}