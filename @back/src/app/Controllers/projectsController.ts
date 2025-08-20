

const projectsController = {
    index(req, res){
        res.json({
            message: 'GreenRoots API Server GET "/api/projects"',
            version: '1.0.0',
            status: '200'
        });
    },

    show(req, res){
        res.json({
            message: 'GreenRoots API Server GET "/api/projects/:id"',
            version: '1.0.0',
            status: '200'
        });
    }
}

export {projectsController};
