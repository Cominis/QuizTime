import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const getHeaderTitle = (route, initialName) => {
    return getFocusedRouteNameFromRoute(route) ?? initialName;
}

export default getHeaderTitle;