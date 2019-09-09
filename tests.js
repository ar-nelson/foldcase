/* eslint-env node, mocha */
const assert = require('assert');
const foldcase = require('.');

describe('foldcase', () => {
  describe('.full', () => {
    it('converts ASCII to lowercase', () => {
      assert.equal(
        foldcase.full('QWERTYUIOPASDFGHJKLZXCVBNM'),
        'qwertyuiopasdfghjklzxcvbnm'
      );
    });
    it('leaves lowercase and non-alphabetic ASCII unchanged', () => {
      assert.equal(
        foldcase.full('qwertyuiopasdfghjklzxcvbnm'),
        'qwertyuiopasdfghjklzxcvbnm'
      );
      assert.equal(
        foldcase.full(' 1234567890!@#$%^&*() '),
        ' 1234567890!@#$%^&*() '
      );
    });
    it('converts BMP Unicode to lowercase', () => {
      assert.equal(foldcase.full('ΑΒΓ'), 'αβγ');
    });
    it('converts single characters to multiple (German ß)', () => {
      assert.equal(foldcase.full('Weiß'), 'weiss');
    });
    it('folds some Unicode scripts to uppercase (Cherokee)', () => {
      assert.equal(foldcase.full('ꮳꮃꭹ'), 'ᏣᎳᎩ');
      assert.equal(foldcase.full('ᏣᎳᎩ'), 'ᏣᎳᎩ');
    });
    it('folds astral plane characters', () => {
      assert.equal(foldcase.full('𐐀𐐁𐐂'), '𐐨𐐩𐐪');
    });
    it('leaves non-alphabetic astral plane characters unchanged', () => {
      assert.equal(foldcase.full('🙈🙉🙊'), '🙈🙉🙊');
    });
  });
  describe('.simple', () => {
    it('converts ASCII to lowercase', () => {
      assert.equal(
        foldcase.simple('QWERTYUIOPASDFGHJKLZXCVBNM'),
        'qwertyuiopasdfghjklzxcvbnm'
      );
    });
    it('leaves lowercase and non-alphabetic ASCII unchanged', () => {
      assert.equal(
        foldcase.simple('qwertyuiopasdfghjklzxcvbnm'),
        'qwertyuiopasdfghjklzxcvbnm'
      );
      assert.equal(
        foldcase.simple(' 1234567890!@#$%^&*() '),
        ' 1234567890!@#$%^&*() '
      );
    });
    it('converts BMP Unicode to lowercase', () => {
      assert.equal(foldcase.simple('ΑΒΓ'), 'αβγ');
    });
    it('does not convert single characters to multiple (German ß)', () => {
      assert.equal(foldcase.simple('Weiß'), 'weiß');
    });
    it('folds some Unicode scripts to uppercase (Cherokee)', () => {
      assert.equal(foldcase.simple('ꮳꮃꭹ'), 'ᏣᎳᎩ');
      assert.equal(foldcase.simple('ᏣᎳᎩ'), 'ᏣᎳᎩ');
    });
    it('folds astral plane characters', () => {
      assert.equal(foldcase.simple('𐐀𐐁𐐂'), '𐐨𐐩𐐪');
    });
    it('leaves non-alphabetic astral plane characters unchanged', () => {
      assert.equal(foldcase.simple('🙈🙉🙊'), '🙈🙉🙊');
    });
  });
  describe('.charFull', () => {
    it('converts single characters to lowercase', () => {
      assert.equal(foldcase.charFull('X'), 'x');
      assert.equal(foldcase.charFull('Y'), 'y');
    });
    it('leaves lowercase and non-alphabetic characters unchanged', () => {
      assert.equal(foldcase.charFull('x'), 'x');
      assert.equal(foldcase.charFull('*'), '*');
    });
    it('leaves strings of length != 1 unchanged', () => {
      assert.equal(foldcase.charFull(''), '');
      assert.equal(foldcase.charFull('FOO'), 'FOO');
    });
    it('folds astral plane characters', () => {
      assert.equal(foldcase.charFull('𐐀'), '𐐨');
    });
  });
  describe('.charSimple', () => {
    it('converts single characters to lowercase', () => {
      assert.equal(foldcase.charSimple('X'), 'x');
      assert.equal(foldcase.charSimple('Y'), 'y');
    });
    it('leaves lowercase and non-alphabetic characters unchanged', () => {
      assert.equal(foldcase.charSimple('x'), 'x');
      assert.equal(foldcase.charSimple('*'), '*');
    });
    it('leaves strings of length != 1 unchanged', () => {
      assert.equal(foldcase.charSimple(''), '');
      assert.equal(foldcase.charSimple('FOO'), 'FOO');
    });
    it('folds astral plane characters', () => {
      assert.equal(foldcase.charSimple('𐐀'), '𐐨');
    });
  });

  it('provides foldcase.full as the default export', () => {
    assert.equal(foldcase('Weiß'), 'weiss');
  });
});
