const axios = require('axios');

module.exports = async (req, res) => {
    try{
        const {search } = req.body;

        const { data: typeData } = await axios.post('http://localhost:9200/coffeetype/_search', {
            query: {
                match: {
                    name: search
                }
            }
        });

        const typeIds = typeData.hits.hits.map(x => x._id);

        const { data } = await axios.post('http://localhost:9200/coffeeinformation/_search', {
            query: {
                bool: {
                    should: [
                        {
                            match: {
                                name: search
                            }
                        }, {
                            terms: {
                                'type.keyword': typeIds
                            }
                        }
                    ]
                }
            }
        });

        console.log(data);
        return res.send(data.hits.hits.map(x => ({_id: x._id, ...x._source})));
    }
    catch(error) {
        console.log(error.response.data);
    }
}