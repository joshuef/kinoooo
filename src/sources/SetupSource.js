
import axios from 'axios';

export default class Source {

    constructor( options ){
        this.endpoint = options.endpoint;

    }

    fetch( ) {
        var self = this;

        return axios.get( '/api/' + self.endpoint )
            .then(function (response) {

                let dataName = response.config.url.split( '/api/' )[1]; 
                let data = response.data[ dataName ];

                return response.data[ dataName ];
            })
            .catch(function (response) {
                return response;
              });

    }
}
