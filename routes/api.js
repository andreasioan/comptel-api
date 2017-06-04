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

router.use('/reports', require('./reports'));

// Get Dashboard
router.get('/dashboard', function (req, res, next) {
    let falloutsTodayQuery = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(2, 'months').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(2, 'months').endOf('day').toISOString());
    let resolutionsTodayQuery = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(2, 'months').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(2, 'months').endOf('day').toISOString());
    let totalUresolvedFalloutsQuery = Fallout.count({
        '$and': [{
                'status': {
                    '$ne': 'CLOSED-FAILURE'
                }
            },
            {
                'status': {
                    '$ne': 'CLOSED-SUCCESSFUL'
                }
            }
        ]
    });

    let falloutsDay0 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(1, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(1, 'days').endOf('day').toISOString());
    let falloutsDay1 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(2, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(2, 'days').endOf('day').toISOString());
    let falloutsDay2 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(3, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(3, 'days').endOf('day').toISOString());
    let falloutsDay3 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(4, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(4, 'days').endOf('day').toISOString());
    let falloutsDay4 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(5, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(5, 'days').endOf('day').toISOString());
    let falloutsDay5 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(6, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(6, 'days').endOf('day').toISOString());

    let resolutionsDay0 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(1, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(1, 'days').endOf('day').toISOString());
    let resolutionsDay1 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(2, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(2, 'days').endOf('day').toISOString());
    let resolutionsDay2 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(3, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(3, 'days').endOf('day').toISOString());
    let resolutionsDay3 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(4, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(4, 'days').endOf('day').toISOString());
    let resolutionsDay4 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(5, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(5, 'days').endOf('day').toISOString());
    let resolutionsDay5 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(6, 'days').startOf('day').toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(6, 'days').endOf('day').toISOString());

    let promises = {
        fallouts: Fallout.find().limit(5).sort('-creation_date'),
        resolutions: Resolution.find().limit(5).sort('-creation_date'),
        total_fallouts: Fallout.count(),
        total_resolutions: Resolution.count(),
        fallouts_today: falloutsTodayQuery,
        resolutions_today: resolutionsTodayQuery,
        total_unresolved_fallouts: totalUresolvedFalloutsQuery,
        startedCount: Fallout.count({
            'status': 'STARTED'
        }),
        createdCount: Fallout.count({
            'status': 'CREATED'
        }),
        errorCounte: Fallout.count({
            'status': 'ERROR'
        }),
        closedFailureCount: Fallout.count({
            'status': 'CLOSED-FAILURE'
        }),
        closedSuccessfullCount: Fallout.count({
            'status': 'CLOSED-SUCCESSFUL'
        }),
        falloutsDay0Count: falloutsDay0,
        falloutsDay1Count: falloutsDay1,
        falloutsDay2Count: falloutsDay2,
        falloutsDay3Count: falloutsDay3,
        falloutsDay4Count: falloutsDay4,
        falloutsDay5Count: falloutsDay5,
        resolutionsDay0Count: resolutionsDay0,
        resolutionsDay1Count: resolutionsDay1,
        resolutionsDay2Count: resolutionsDay2,
        resolutionsDay3Count: resolutionsDay3,
        resolutionsDay4Count: resolutionsDay4,
        resolutionsDay5Count: resolutionsDay5
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
            fallouts_day_0_count: data[12],
            fallouts_day_1_count: data[13],
            fallouts_day_2_count: data[14],
            fallouts_day_3_count: data[15],
            fallouts_day_4_count: data[16],
            fallouts_day_5_count: data[17],
            resolutions_day_0_count: data[18],
            resolutions_day_1_count: data[19],
            resolutions_day_2_count: data[20],
            resolutions_day_3_count: data[21],
            resolutions_day_4_count: data[22],
            resolutions_day_5_count: data[23]
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
        query.where('creation_date')
            .gte(moment(fromDate).utc().startOf('day').toISOString())
            .lte(moment(toDate).utc().endOf('day').toISOString());
    } else if (req.query.createdateday) {
        let date = new Date(req.query.createdateday);
        query.where('creation_date')
            .gte(moment(date).utc().startOf('day').toISOString())
            .lte(moment(date).utc().endOf('day').toISOString());
    }

    // Where Due Date
    if (req.query.duedatefrom && req.query.duedateto) {
        let fromDate = new Date(req.query.duedatefrom);
        let toDate = new Date(req.query.duedateto);
        query.where('due_date')
            .gte(moment(fromDate).utc().startOf('day').toISOString())
            .lte(moment(toDate).utc().endOf('day').toISOString());
    } else if (req.query.duedateday) {
        let date = new Date(req.query.duedateday);
        query.where('due_date')
            .gte(moment(date).utc().startOf('day').toISOString())
            .lte(moment(date).utc().endOf('day').toISOString());
    }

    // Search
    if (req.query.search && req.query.in) {
        query.where(req.query.in).equals(req.query.search);
    }

    // By Source System
    if (req.query.system) {
        query.where('source_system').equals(req.query.system);
    }

    // By Status
    if (req.query.status) {
        query.where('status').equals(req.query.status);
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
        query.where('creation_date')
            .gte(moment(fromDate).utc().startOf('day').toISOString())
            .lte(moment(toDate).utc().endOf('day').toISOString());
    } else if (req.query.createdateday) {
        let date = new Date(req.query.createdateday);
        query.where('creation_date')
            .gte(moment(date).utc().startOf('day').toISOString())
            .lte(moment(date).utc().endOf('day').toISOString());
    }

    // Where Due Date
    if (req.query.duedatefrom && req.query.duedateto) {
        let fromDate = new Date(req.query.duedatefrom);
        let toDate = new Date(req.query.duedateto);
        query.where('due_date')
            .gte(moment(fromDate).utc().startOf('day').toISOString())
            .lte(moment(toDate).utc().endOf('day').toISOString());
    } else if (req.query.duedateday) {
        let date = new Date(req.query.duedateday);
        query.where('due_date')
            .gte(moment(date).utc().startOf('day').toISOString())
            .lte(moment(date).utc().endOf('day').toISOString());
    }

    // Search
    if (req.query.search && req.query.in) {
        if (req.query.in === 'id') {
            query.where(req.query.in).equals(parseint(req.query.search));
        } else {
            query.where(req.query.in).equals(req.query.search);
        }

    }

    // By Source System
    if (req.query.system) {
        query.where('target_system').equals(req.query.system);
    }

    // By Status
    if (req.query.status) {
        query.where('status').equals(req.query.status);
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