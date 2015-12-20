
import axios from 'axios';

export default class Source {

    constructor( options ){
        this.endpoint = options.endpoint;

    }
    anotherFunction( )
    {

        console.log( 'anotherfunction, bla', this.endpoint );
        return 'bla';
    }
    fetch( ) {
        var self = this;

        console.log( 'FETCHING', this.endpoint );


        return axios.get( '/api/' + self.endpoint )
            .then(function (response) {

                let dataName = response.config.url.split( '/api/' )[1]; 

                let data = response.data[ dataName ];

                return response.data[ dataName ];
            })
            .catch(function (response) {
                console.log('ERRROR');
                console.log(response);
                return response;
              });

    }
}
