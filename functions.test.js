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


// let fns = require("./functions.js");

test("returnMovie should return movie", () => {
    let result = fns.returnMovie();
    expect(result).toBe('Movie');
});

test("sawWhatsUp should return What's up Jeff? when given Jeff", () => {
    let result = fns.sayWhatsUp("Jeff");
    expect(result).toBe("What's up Jeff?");
});

test("hasStarredIn(Chris Pratt, Jurassic World) to be Chris Pratt has starred in Jurassic World", () => {
    expect(fns.hasStarredIn("Chris Pratt", "Jurassic World")).toBe('Chris Pratt has starred in Jurassic World');
});

test("movieYear(1988) to be this movie came out 30 years ago!", () => {
    expect(fns.movieYear(1988)).toBe("this movie came out " + 30 + " years ago!");
});

test("annualEarningsAverage(Michael Keaton,1000, 40) to be Michael Keaton has earned 100 a year!", () => {
    expect(fns.annualEarningsAverage("Michael Keaton", 1000, 10)).toBe("Michael Keaton has earned " + 100 + " a year!");
});
