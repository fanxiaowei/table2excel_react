import HTTPService from '@network/HTTPService';

export const testAsync = async () => {
    const token = localStorage.getItem('token');
    if (token) {
       return HTTPService.get('api/posts/1');
    }
};
