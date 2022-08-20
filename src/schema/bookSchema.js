const { nanoid } = require('nanoid');

class bookSchema {
    constructor(entry) {
        const currentTime = new Date().toISOString();
        this.id = nanoid(10);
        this.name = entry.name;
        this.year = entry.year;
        this.author = entry.author;
        this.summary = entry.summary;
        this.publisher = entry.publisher;
        this.pageCount = entry.pageCount;
        this.readPage = entry.readPage;
        this.finished = entry.readPage === entry.pageCount;
        this.reading = entry.reading;
        this.insertedAt = currentTime;
        this.updatedAt = currentTime;
    }

    updateBook(newData) {
        this.name = newData.name;
        this.year = newData.year;
        this.author = newData.author;
        this.summary = newData.summary;
        this.publisher = newData.publisher;
        this.pageCount = newData.pageCount;
        this.readPage = newData.readPage;
        this.reading = newData.reading;
        this.updatedAt = new Date().toISOString();
    }


}

module.exports = bookSchema;
