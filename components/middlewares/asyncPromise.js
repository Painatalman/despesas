export default function({dispatch}) {
    return next => action => {
        // Check for a payload
        // containing a 'then' method.
        // This is our way of determining whether this
        // is a promise or not... and no, it's not great!
        if (!action.payload || !action.payload.then) {
            return next(action);
        } 

        action.payload
            .then(response => {
                // create a new action
                const newAction = {
                    ...action,
                    payload: response.data
                }

                // but why dispatch and not just next?
                // because we're gonna start the middleware cycle all over again
                // this way, we're triggering an action again and 
                // running through all middleware
                dispatch(newAction);
            })
            .catch(err => {
                console.error(`promise rejected ${error}`);
            })

        next(action);
    }
}