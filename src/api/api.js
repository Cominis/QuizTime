import {
    getRandomQuestionsUrl,
    getQuestionsFromCategoryUrl,
    getTokenUrl,
    getTokenResetUrl,
    getCategoriesListUrl,
    getCategoryCountUrl
} from "./url";

export const request = async (url) => {
    return fetch(url)
        .then(handleErrors)
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log(error);
        });
};

const handleErrors = (response) => {
    if (!response.ok) throw Error(response.statusText);
    return response;
};

export const requestQuizScreen = (callback) => {
    return Promise.all([
        request(getRandomQuestionsUrl())
    ])
        .then((values) => callback(values[0]["results"]))
        .catch((error) => console.log(error));
};

export const requestToken = async () => {
    return await request(getTokenUrl());
}

export const requestTokenReset = async (token) => {
    return await request(getTokenResetUrl(token));
}

export const requestCategories = async () => {
    return await request(getCategoriesListUrl());
}

export const requestCategoryCount = async (category) => {
    return await request(getCategoryCountUrl(category));
}

export const requestRandomQuestions = async (token, amount = 10, difficulty = 'any') => {
    const url = getRandomQuestionsUrl(token, amount, difficulty);
    return await request(url);
}

export const requestQuestionsFromCategory = async (token, category, amount = 10, difficulty = 'any') => {
    const url = getQuestionsFromCategoryUrl(token, category, amount, difficulty);
    return await request(url);
}

