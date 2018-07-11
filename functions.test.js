const fns = require('./utils/functions')

test('Should return a single user', async () => {
      await console.log(fns.getPopular())
     const result = await fns.getPopular()
    console.log(result, 'this is result')
     expect(result.length).resolves.toEqual(20)
} )

test('Get more than one movie',  () => {
    expect(  fns.getInTheaters()).toBeDefined()
})


