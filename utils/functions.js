const axios = require('axios')

const fns = {
  getPopular: ()  => 
    axios
    .get('https://api.themoviedb.org/3/movie/299536?api_key=7e09033ae18d3f476763f2bf4ee67f60&language=en-US')
    .then(res => res.data)
    .catch(err => 'error')
  ,

  getMovie: ()  => {
return axios
    .get('https://api.themoviedb.org/3/movie/299536?api_key=7e09033ae18d3f476763f2bf4ee67f60&language=en-US')
    .then(res => res.data)
    .catch(err => 'error')
  },

  getUser: (num) => {
   const user = {
      firstName: 'Carter',
      lastName: "Childs",
      age: num,
    }
    return user  
  },
  fetchUser: () =>
  axios
    .get('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.data)
    .catch(err => 'error'),

  fetchUser: () =>
   axios
    .get('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.data)
    .catch(err => 'error')

};

  

module.exports = fns