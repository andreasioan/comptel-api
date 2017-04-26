var express = require('express');
var router = express.Router();
var moment = require('moment');

var Fallout = require('../models/fallout');
var Resolution = require('../models/resolution');
var Detail = require('../models/detail');

// Date queries dont work as dates are not stored
// as dates in the db, they are strings, hence 
// cant treat them as dates without an extreme 
// performance hit


// Get Dashboard
router.get('/dashboard', function (req, res, next) {
    let falloutQuery = Fallout.find().limit(5);
     
       
    let resolutionQUery = Resolution.find().limit(5);
        
       

    let promises = {
        fallouts: Fallout.find().limit(5),
        resolutions: Resolution.find().limit(5),
        total_fallouts: Fallout.count(),
        total_resolutions: Resolution.count()
    };

    promises = Object.keys(promises).map((x) => promises[x]);
    return Promise.all(promises).then((data) => {
        let result = {
            fallouts: data[0],
            resolutions: data[1],
            total_fallouts: data[2],
            total_resolutions: data[3]
        };

        return res.status(200).json(result);
    });
});

// Get fallouts
router.get('/fallouts', function (req, res, next) {
    var query = Fallout.find();

    // Where Creation Date
    if (req.query.createdatefrom && req.query.createdateto) {
        let fromDate = new Date(req.query.createdatefrom);
        let toDate = new Date(req.query.createdateto);
        console.log(query.where('creation_timestamp').gte(moment(fromDate).startOf('day').toISOString()));
    }

    //Where Due Date
    if (req.query.duedatefrom && req.query.duedateto) {
        let fromDate = new Date(req.query.duedatefrom);
        let toDate = new Date(req.query.duedateto);
        query.where('due_date').gte(moment(fromDate).startOf('day').toISOString()).lte(moment(toDate).endOf('day').toISOString());
    }

    // Search
    if (req.query.search && req.query.in) {
        query.where(req.query.in).equals(req.query.search);
    }

    Fallout.paginate(query, {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.rows ? Number(req.query.rows) : 25,
        sort: req.query.sort ? req.query.sort : '-id'
    }, function (err, fallouts) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        return res.status(200).json(fallouts);
    });
});

// Get resolutions
router.get('/resolutions', function (req, res, next) {
    var query = Resolution.find();

    // Where Creation Date
    if (req.query.createdatefrom && req.query.createdateto) {
        let fromDate = new Date(req.query.createdatefrom);
        let toDate = new Date(req.query.createdateto);
        query.where().gte(moment(fromDate).startOf('day')).lte(moment(toDate).endOf('day'));
    }

    //Where Due Date
    if (req.query.duedatefrom && req.query.duedateto) {
        let fromDate = new Date(req.query.duedatefrom);
        let toDate = new Date(req.query.duedateto);
        query.where().gte(moment(fromDate).startOf('day')).lte(moment(toDate).endOf('day'));
    }

    // Search
    if (req.query.search && req.query.in) {
        query.where(req.query.in).equals(req.query.search);
    }

    Resolution.paginate(query, {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.rows ? Number(req.query.rows) : 25,
        sort: req.query.sort ? req.query.sort : '-id'
    }, function (err, resolutions) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        return res.status(200).json(resolutions);
    });
});

// Get details
router.get('/details', function (req, res, next) {
    Detail.find(function (err, details) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        return res.status(200).json(details);
    });
});

module.exports = router;