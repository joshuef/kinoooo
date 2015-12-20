

import axios from 'axios';

// const ShowsSource = {
//   remoteAction: {
//     remote(state) {

//     },
//     local(state) {
//       return null;
//     },
//     shouldFetch(state) {
//       return true;
//     },
//     loading() {},
//     success() {},
//     error() {}
//   }
// };

// export default ShowsSource;


var ShowsSource = {
  fetch: function () {

    return axios.get('/api/shows')
        .then(function (response) {

            // console.log(response);
            return response.data.shows;
        })
        .catch(function (response) {
            console.log(response);
            return response;
          });

      }
};

export default ShowsSource;