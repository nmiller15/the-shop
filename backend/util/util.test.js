const assert = require('assert');
const dateCreated = require('./dateCreated');

describe('dateCreated', () => {
    it('returns a date properly formatted', () => {
        const regexp = new RegExp(/^\d{4}(-\d{2}){2}T(\d{2}:){2}\d{2}.\d{3}$/);

        const actual = dateCreated();
        console.log(actual);
        assert.match(actual, regexp)
    })
})