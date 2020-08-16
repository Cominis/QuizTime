const ROOT_URL = "https://opentdb.com/";

const queryString = (obj) => {
    return Object.entries(obj)
        .map(([index, val]) => `${index}=${val}`)
        .join("&");
};

const defaultQuery = {
    encode: 'url3986'
};

export const getRandomQuestionsUrl = (token, amount) => {
    const query = { ...defaultQuery, amount: amount, token: token };
    return `${ROOT_URL}api.php?${queryString(query)}`;
}

export const getQuestionsFromCategoryUrl = (token, category, amount) => {
    const query = { ...defaultQuery, amount: amount, category: category, token: token };
    return `${ROOT_URL}api.php?${queryString(query)}`;
}

export const getTokenUrl = () => `${ROOT_URL}api_token.php?command=request`;
export const getTokenResetUrl = (token) => `${ROOT_URL}api_token.php?command=reset&token=${token}`;

export const getCategoriesListUrl = () => `${ROOT_URL}api_category.php`;
export const getCategoryCountUrl = (category) => `${ROOT_URL}api_count.php?category=${category}`;