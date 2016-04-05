describe('test', function() {
    var d = document.querySelector('body');

    it('Should exist', function() {
        expect(d.nodeName).toBe('BODY');
    });
});