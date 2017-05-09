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

    let falloutsTodayQuery = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(2, 'months').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(2, 'months').endOf('day').toISOString());
    let resolutionsTodayQuery = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(2, 'months').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(2, 'months').endOf('day').toISOString());
    let totalUresolvedFalloutsQuery = Fallout.count({
        '$and': [
            { 'status': { '$ne': 'CLOSED-FAILURE' } },
            { 'status': { '$ne': 'CLOSED-SUCCESSFUL' } }
        ]
    });

    let falloutsMonth0 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(1, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(1, 'days').endOf('day').toISOString());
    let falloutsMonth1 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(2, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(2, 'days').endOf('day').toISOString());
    let falloutsMonth2 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(3, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(3, 'days').endOf('day').toISOString());
    let falloutsMonth3 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(4, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(4, 'days').endOf('day').toISOString());
    let falloutsMonth4 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(5, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(5, 'days').endOf('day').toISOString());
    let falloutsMonth5 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(6, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(6, 'days').endOf('day').toISOString());

    let resolutionsMonth0 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(1, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(1, 'days').endOf('day').toISOString());
    let resolutionsMonth1 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(2, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(2, 'days').endOf('day').toISOString());
    let resolutionsMonth2 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(3, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(3, 'days').endOf('day').toISOString());
    let resolutionsMonth3 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(4, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(4, 'days').endOf('day').toISOString());
    let resolutionsMonth4 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(5, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(5, 'days').endOf('day').toISOString());
    let resolutionsMonth5 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(6, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(6, 'days').endOf('day').toISOString());

    let promises = {
        fallouts: Fallout.find().limit(5),
        resolutions: Resolution.find().limit(5),
        total_fallouts: Fallout.count(),
        total_resolutions: Resolution.count(),
        fallouts_today: falloutsTodayQuery,
        resolutions_today: resolutionsTodayQuery,
        total_unresolved_fallouts: totalUresolvedFalloutsQuery,
        startedCount: Fallout.count({ 'status': 'STARTED' }),
        createdCount: Fallout.count({ 'status': 'CREATED' }),
        errorCounte: Fallout.count({ 'status': 'ERROR' }),
        closedFailureCount: Fallout.count({ 'status': 'CLOSED-FAILURE' }),
        closedSuccessfullCount: Fallout.count({ 'status': 'CLOSED-SUCCESSFUL' }),
        falloutsMonth0Count: falloutsMonth0,
        falloutsMonth1Count: falloutsMonth1,
        falloutsMonth2Count: falloutsMonth2,
        falloutsMonth3Count: falloutsMonth3,
        falloutsMonth4Count: falloutsMonth4,
        falloutsMonth5Count: falloutsMonth5,
        resolutionsMonth0Count: resolutionsMonth0,
        resolutionsMonth1Count: resolutionsMonth1,
        resolutionsMonth2Count: resolutionsMonth2,
        resolutionsMonth3Count: resolutionsMonth3,
        resolutionsMonth4Count: resolutionsMonth4,
        resolutionsMonth5Count: resolutionsMonth5
    };

    promises = Object.keys(promises).map((x) => promises[x]);
    return Promise.all(promises).then((data) => {
        let result = {
            fallouts: data[0],
            resolutions: data[1],
            total_fallouts: data[2],
            total_resolutions: data[3],
            fallouts_today: data[4],
            resolutions_today: data[5],
            total_unresolved_fallouts: data[6],
            started_count: data[7],
            created_count: data[8],
            error_count: data[9],
            closed_failure_count: data[10],
            closed_successfull_count: data[11],
            fallouts_month_0_count: data[12],
            fallouts_month_1_count: data[13],
            fallouts_month_2_count: data[14],
            fallouts_month_3_count: data[15],
            fallouts_month_4_count: data[16],
            fallouts_month_5_count: data[17],
            resolutions_month_0_count: data[18],
            resolutions_month_1_count: data[19],
            resolutions_month_2_count: data[20],
            resolutions_month_3_count: data[21],
            resolutions_month_4_count: data[22],
            resolutions_month_5_count: data[23]
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
        query.where('creation_date').gte(moment(fromDate).startOf('day').toISOString()).lte(moment(toDate).endOf('day').toISOString());
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
        query.where('creation_date').gte(moment(fromDate).startOf('day')).lte(moment(toDate).endOf('day'));
    }

    //Where Due Date
    if (req.query.duedatefrom && req.query.duedateto) {
        let fromDate = new Date(req.query.duedatefrom);
        let toDate = new Date(req.query.duedateto);
        query.where('due_date').gte(moment(fromDate).startOf('day')).lte(moment(toDate).endOf('day'));
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
router.get('/details/:fallout_id', function (req, res, next) {
    Detail.find()
        .where('fallout_id').equals(req.params.fallout_id)
        .exec(function (err, details) {
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