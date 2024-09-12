

let ROUTES_PUBLIC: string = '';
let PVIEWISAPIPRO: string = '';
let SEND_PDF_ROUTE: string = '';
let API_INTRENET: string = '';
let PVIEW_REST_CONES: string = '';
let URL_RATE_YIELD: string = '';

if(process.env.NODE_ENV) {
    switch (process.env.NODE_ENV) {
        case "production":
            API_INTRENET = 'https://intranet-backend-qa.azurewebsites.net';
            ROUTES_PUBLIC = 'https://360-parval.azurewebsites.net';
            PVIEWISAPIPRO = 'http://179.51.66.30:8082/pview/PViewISAPI.dll/la/rest/TView';
            SEND_PDF_ROUTE = 'https://api.simv.gob.do/SRTP/api/SendXML';
            PVIEW_REST_CONES = 'http://191.97.88.198:8083/pview/PviewRestCones.dll/la/rest/TView';
            URL_RATE_YIELD = 'https://rate-yield-qa.azurewebsites.net';
            break;
        case "development":
            API_INTRENET = 'http://localhost:8002';
            ROUTES_PUBLIC = 'http://localhost:3000';
            PVIEWISAPIPRO = 'http://179.51.66.30:8082/pview/PViewISAPI.dll/la/rest/TView';
            SEND_PDF_ROUTE = 'https://api.simv.gob.do/SRTP/api/SendXML';
            PVIEW_REST_CONES = 'http://191.97.88.198:8083/pview/PviewRestCones.dll/la/rest/TView';
            URL_RATE_YIELD = 'http://localhost:8001';
            break;
        case "test":
            API_INTRENET = 'http://localhost:8002';
            ROUTES_PUBLIC = 'https://360-parval.azurewebsites.net';
            PVIEWISAPIPRO = 'http://179.51.66.30:8082/pview/PViewISAPI.dll/la/rest/TView';
            SEND_PDF_ROUTE = 'https://api.simv.gob.do/SRTPTEST/api/SENDXML';
            PVIEW_REST_CONES = 'http://191.97.88.198:8083/pview/PviewRestCones.dll/la/rest/TView';
            URL_RATE_YIELD = 'http://localhost:8001';
            break;
    }
}

export default {
    ROUTES_PUBLIC,
    PVIEWISAPIPRO,
    SEND_PDF_ROUTE,
    API_INTRENET,
    PVIEW_REST_CONES,
    URL_RATE_YIELD
}


