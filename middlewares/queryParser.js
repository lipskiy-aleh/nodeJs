class QueryParser {

    queryParser(req, res, next) {
        if (req.parsedQuery) {
            return next();
        }

        req.parsedQuery = req.query;

        next();
    }

}

const queryParser = new QueryParser();
export default queryParser;

