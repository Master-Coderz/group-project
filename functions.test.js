const fns = require('./utils/functions')

// test('Should return a single user', async () => {
//       await console.log(fns.getPopular())
//      const result = await fns.getPopular()
//     console.log(result, 'this is result')
//      expect(result.length).resolves.toEqual(20)
// } )

// test('Get more than one movie',  () => {
//     expect(  fns.getInTheaters()).toBeDefined()
// })

//Richie's tests
test("returnMovie() should return movie", () => {
    expect( fns.returnMovie('Shawshank Redemption') ).toEqual( 'Shawshank Redemption' );
  });

test('rateMovie should return rated movie', () => {
    expect(fns.rateMovie('Jurassic World', '1 out of 10')).toEqual('I rate Jurassic World a 1 out of 10')
})

test('favoriteActor should return a favorite actor', () => {
    expect(fns.favoriteActor('Leonardo DiCaprio')).toEqual('My favorite actor is Leonardo DiCaprio')
})

test("sayMyName should return the critic's name", () => {
    expect(fns.sayMyName('Carter')).toEqual('Carter')
})

test('movieTime shoudl return the time of the movie', () => {
    expect(fns.movieTime('7:45')).toEqual('The movie is at 7:45')
})

