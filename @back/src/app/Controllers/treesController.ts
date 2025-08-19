

const treesController = {
    index(req, res){
        res.json({
            message: 'GreenRoots API Server GET "/trees"',
            version: '1.0.0',
            status: '200'
        });
    },

    show(req, res){
        res.json({
            message: 'GreenRoots API Server GET "trees/:id"',
            version: '1.0.0',
            status: '200'
        });
    }
}

export {treesController};