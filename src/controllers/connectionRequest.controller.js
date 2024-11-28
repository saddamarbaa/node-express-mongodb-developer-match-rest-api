const { sendConnectionRequestService } = require("../services/connectionRequest.service");


module.exports.sendConnectionRequestController= (req,res,next) => sendConnectionRequestService(req,res, next)