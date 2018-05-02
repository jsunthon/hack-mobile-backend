class BadRequestError extends Error {
    constructor() {
        super();
        this.name = 'Bad Request';
        this.message = 'error: invalid input'
    }
}

module.exports = BadRequestError;