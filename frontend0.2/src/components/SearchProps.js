let defaults = {
    /*
     * minimum value length to search
     *
     * _Number_
     */
    minimumValueLength  : 1,

    /*
     * minimum score to display
     *
     * _Number_
     */
    minimumScore        : 0,


    /*
     * params to test for score
     *
     * called as:
     * score += this.scoreThis( search[ param ], weights[ param ] );
     */
    scoreProperties     : [ 'name', 'nameFlat', 'nameSplit', 'value', 'valueFlat',
                                    'valueSplit', 'description', 'descriptionSplit' ],

    /*
     * params to test with startsWith
     *
     * called as:
     * score += startsWith( query, search[ param ], weights[ param + 'StartsWith' ] );
     */
    startsWithProperties : [ 'name', 'value' ],

    /*
     * scoring weight
     */
    weights             : {
        name                : 30,
        nameStartsWith      : 50,
        nameFlat            : 10,
        nameSplit           : 10,

        value               : 30,
        valueStartsWith     : 50,
        valueFlat           : 10,
        valueSplit          : 10,

        description         : 15,
        descriptionSplit    : 30
    }
};

export default defaults;