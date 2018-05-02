class ResourceNotFoundError extends Error {
    constructor() {
        super();
        this.name = 'Resource Not Found Error';
        this.message = 'error: resource not found'
    }

}

module.exports = ResourceNotFoundError;