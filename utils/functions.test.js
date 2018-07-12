const fns = require('./functions')


test('User fetched name should be Leanne Graham', () => {
  expect.assertions(1);
  return fns.fetchUser().then(data => {
    expect(data.name).toEqual('Leanne Graham');
  });
});

test('check movie', () => {
    expect.assertions(1);
    return fns.getMovie().then(data => {
      expect(data.title).toEqual("Avengers: Infinity War");
     
    });
  });

test('get user', () => {
    expect(fns.getUser().firstName).toEqual('Carter')
})


test('get user age', () => {
    expect(fns.getUser(21).age).toEqual(21)
})

test('User fetched name should be Leanne Graham', () => {
    expect.assertions(1);
    return fns.fetchUser().then(data => {
      expect(data.website).toEqual("hildegard.org");
    });
  });

  test('check movie id', () => {
    expect.assertions(1);
    return fns.getPopular().then(data => {
      expect(data.id).toEqual(299536);
     
    });
  });