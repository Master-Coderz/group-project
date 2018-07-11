const axios = require('axios')

module.exports = {
    getPopular:   async() => {
        await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7e09033ae18d3f476763f2bf4ee67f60&language=en-US&page=1`
        ).then((res) => {
        return res
          });
      },

      getInTheaters: async ()  => {
         await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        ).then((res) => {
          this.setState({
            inTheaters: res.data.results
          });
        });
      },

      getWatchlist: () => {
        axios.get('/api/getWatchlist')
          .then((res) => {
            this.setState({
              watchlist: res.data
            })
            let onList = this.state.watchlist.filter(e => {
              return e.id === this.props.match.params.id
    
            })
            if (onList.length > 0) {
              this.setState({ onWatchList: true })
            }
    
          })
      }
}