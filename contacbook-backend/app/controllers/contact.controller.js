const { MongoAPIError } = require("mongodb");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.findAll = async (req,res, next) => {
    let document = [];
    try {
        const ContactService = new ContactService(MongoDB.client);
        const {name} = req.querty;
        if (name) {
            document = await ContactService.findByName(name);
        }
        else {
            document = await ContactService.find({});
        }
    }
    catch (error){
        return next (
            new ApiError(500, "An error occured while retriveving contacts")
        );
    }
    return res.sent(docunent);
}

exports.findOne = async (req,res, next) => {
    let document = [];
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);

    }
    catch (error){
        return next (
            new ApiError(500, `error retrieveving contact with id= ${req.params.id}`)
        );
    }
    return res.sent(docunent);
}

exports.update = async (req,res, next) => {
    if(Object.keys(req, body).length== 0){
        return next( new ApiError(400, "data to update can not be empty"));
    }
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "contact was update successfully"});
    }
    catch (error){
        return next (
            new ApiError(500, `Error updating contact with id = ${req.params.id}`)
        );
    }

}

exports.delete = async (req,res, next) => {
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "contact was deleted successfully"});
    }
    catch (error){
        return next (
            new ApiError(500, `could not delete contact with id = ${req.params.id}`)
        );
    }

}

exports.deleteAll = async (req, res) => {
    
    try {
        const ContactService = new ContactService(MongoDB.client);
        const deletedCount = await ContactService.deleteAll(); 
        return res.send({message: `${deletedCount} contact were deleted successfully`});
    }
    catch (error){
        return next (
            new ApiError(500, `an error occurred while removing all contact`)
        );
    }
};

exports.findAllFavorite = async (req, res) => {
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.findFavorite(req.params.id);
        return res.send(document);
    }
    catch (error){
        return next (
            new ApiError(500, `an error occurred while retrieving favorite contact`)
        );
    }
};
exports.create = async (req,res, next ) => {
    if(!req.body?.name) {
        return next( APIError(400, "name can not be empty"));
    }
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.create(req.body);
        return res.send(docunent);
    } catch(error){
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
}
