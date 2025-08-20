const localizationsController = {
    index(req, res){
        res.json({
            message: 'GreenRoots API Server GET "/api/locations"',
            version: '1.0.0',
            status: '200'
        });
    },

    show(req, res){
        res.json({
            message: 'GreenRoots API Server GET "/api/locations/:id"',
            version: '1.0.0',
            status: '200'
        });
    }
}

export {localizationsController};
