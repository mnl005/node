export const LOG = (SERVICE_NAME, ERR_MSG) => {
    return (handler) => {
        return async (req, res, next) => {
            res.locals = {
                info: {
                    status: "success",
                    url: req.originalUrl,
                    type: req.method,
                    host: req.hostname,
                    service: SERVICE_NAME,
                    err_msg: "no err_msg",
                },
                req_body: req.body,
                res_body: res.locals.res_body ? res.locals.res_body : {},
            };

            try {
                await handler(req, res, next);
                console.log(res.locals);
                next();

            } catch (err) {
                res.locals = {
                    info: {
                        status: "false",
                        url: req.originalUrl,
                        type: req.method,
                        host: req.hostname,
                        service: SERVICE_NAME,
                        err_msg: ERR_MSG,
                    },
                    req_body: req.body,
                    res_body: res.locals.body,
                };
                console.log(res.locals);
                next(err);
            }
        };
    };

};