const {
    addBookHandler,
    getBookHandler,
    editBookHandler,
    deleteBookHandler,
} = require('../controllers/bookController');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{id?}',
        handler: getBookHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookHandler,
    },
];

module.exports = routes;
