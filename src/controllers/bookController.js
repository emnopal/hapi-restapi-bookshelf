const books = require('../models/bookModel');
const bookFailHandler = require('../helpers/bookFailHandler');
const bookSuccessHandler = require('../helpers/bookSuccessHandler');
const bookSchema = require('../schema/bookSchema');

const addBookHandler = (request, h) => {
    const { payload } = request;

    const newBook = new bookSchema(payload);

    const isNameValid = payload.name !== undefined;
    const isPageNotValid = payload.readPage > payload.pageCount ? true : false;

    if (!isNameValid) {
        return bookFailHandler({
            h,
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
            statusCode: 400,
        });
    }

    if (isPageNotValid) {
        return bookFailHandler({
            h,
            message: `Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount`,
            statusCode: 400,
        });
    }

    books.set(newBook.id, newBook);

    return bookSuccessHandler({
        h,
        data: {
            bookId: newBook.id,
        },
        message: 'Buku berhasil ditambahkan',
        statusCode: 201,
    });
};

const getBookHandler = (request, h) => {
    const { id } = request.params;
    const { name, reading, finished, all } = request.query;

    if (id !== undefined) {
        return books.get(id) ? bookSuccessHandler({
            h,
            data: {
                book: books.get(id),
            },
            message: `Sukses mendapatkan buku dengan id: ${id}`,
            statusCode: 200,
        }) : bookFailHandler({
            h: h,
            message: `Buku tidak ditemukan`,
            statusCode: 404,
        });
    }

    const allBooks = [...books.values()];
    let booksByQuery = allBooks;

    if (name !== undefined) {
        booksByQuery = allBooks // get string objects contains inside array
            .filter((entry) => entry.name.match(new RegExp(name, 'i')));
    }

    if (reading !== undefined) {
        booksByQuery = allBooks
            .filter((entry) => entry.reading === (reading === '1'));
    }

    if (finished !== undefined) {
        booksByQuery = allBooks
            .filter((entry) => entry.finished === (finished === '1'));
    }

    return bookSuccessHandler({
        h,
        data: {
            books: all ? booksByQuery : booksByQuery.map(
                ({ id, name, publisher }) => ({ id, name, publisher }),
            ) // get only some data from object inside an array;,
        },
        message: 'Sukses mendapatkan list buku',
        statusCode: 200,
    });
};

const editBookHandler = (request, h) => {
    const { id } = request.params;
    const { payload } = request;

    const isNameValid = payload.name !== undefined;
    const isPageNotValid = payload.readPage > payload.pageCount ? true : false;
    const bookIDToUpdate = books.get(id);

    if (!isNameValid) {
        return bookFailHandler({
            h,
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
            statusCode: 400,
        });
    }

    if (isPageNotValid) {
        return bookFailHandler({
            h,
            message: `Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount`,
            statusCode: 400,
        });
    }

    if (bookIDToUpdate !== undefined) {
        bookIDToUpdate.updateBook(payload);
        return bookSuccessHandler({
            h,
            message: `Buku berhasil diperbarui`,
            statusCode: 200,
        });
    }

    return bookFailHandler({
        h,
        message: `Gagal memperbarui buku. Id tidak ditemukan`,
        statusCode: 404,
    });
};

const deleteBookHandler = (request, h) => {
    const { id } = request.params;
    const bookIDToDelete = books.get(id);

    if (bookIDToDelete !== undefined) {
        books.delete(id);
        return bookSuccessHandler({
            h,
            message: `Buku berhasil dihapus`,
            statusCode: 200,
        });
    }

    return bookFailHandler({
        h,
        message: `Buku gagal dihapus. Id tidak ditemukan`,
        statusCode: 404,
    });
};

module.exports = {
    addBookHandler,
    getBookHandler,
    editBookHandler,
    deleteBookHandler,
};
