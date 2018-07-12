//Richie
pm.test("response is ok", function () {
  pm.response.to.have.status(200);
});

pm.test("User name is stored in review", function () {
  let body = pm.response.json()
  pm.expect(body.firstname)
});

pm.test("Movie has reviews", function () {
  let body = pm.response.json()
  pm.expect(body.length).to.eql(3)
});


pm.test("Movie has multiple reviews", function () {
  let body = pm.response.json()
  pm.expect(body.length).to.not.eql(1)
});


pm.test("Reviews has user profile pic", function () {
  let body = pm.response.json()
  pm.expect(body.profilepic)
});