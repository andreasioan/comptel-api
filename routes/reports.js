var express = require('express');
var router = express.Router();
var moment = require('moment');

var Fallout = require('../models/fallout');
var Resolution = require('../models/resolution');
var Detail = require('../models/detail');

// Get Reports
router.get('/creationdate', function (req, res, next) {

    var subInc = 'days';
    var startEnd = 'day';

    switch (req.query.length) {
        case 'months':
            subInc = 'months';
            startEnd = 'month';
            break;
        case 'years':
            subInc = 'years';
            startEnd = 'year';
            break;
    }

    let falloutsMonth0 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(1, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(1, subInc).endOf(startEnd).toISOString());
    let falloutsMonth1 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(2, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(2, subInc).endOf(startEnd).toISOString());
    let falloutsMonth2 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(3, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(3, subInc).endOf(startEnd).toISOString());
    let falloutsMonth3 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(4, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(4, subInc).endOf(startEnd).toISOString());
    let falloutsMonth4 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(5, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(5, subInc).endOf(startEnd).toISOString());
    let falloutsMonth5 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(6, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(6, subInc).endOf(startEnd).toISOString());
    let falloutsMonth6 = Fallout.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(7, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(7, subInc).endOf(startEnd).toISOString());

    let resolutionsMonth0 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(1, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(1, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth1 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(2, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(2, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth2 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(3, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(3, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth3 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(4, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(4, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth4 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(5, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(5, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth5 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(6, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(6, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth6 = Resolution.count()
        .where('creation_date')
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(7, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(7, subInc).endOf(startEnd).toISOString());

    let promises = {
        falloutsMonth0Count: falloutsMonth0,
        falloutsMonth1Count: falloutsMonth1,
        falloutsMonth2Count: falloutsMonth2,
        falloutsMonth3Count: falloutsMonth3,
        falloutsMonth4Count: falloutsMonth4,
        falloutsMonth5Count: falloutsMonth5,
        falloutsMonth6Count: falloutsMonth6,
        resolutionsMonth0Count: resolutionsMonth0,
        resolutionsMonth1Count: resolutionsMonth1,
        resolutionsMonth2Count: resolutionsMonth2,
        resolutionsMonth3Count: resolutionsMonth3,
        resolutionsMonth4Count: resolutionsMonth4,
        resolutionsMonth5Count: resolutionsMonth5,
        resolutionsMonth6Count: resolutionsMonth6
    };

    promises = Object.keys(promises).map((x) => promises[x]);
    return Promise.all(promises).then((data) => {
        let result = {
            fallouts_month_0_count: data[0],
            fallouts_month_1_count: data[1],
            fallouts_month_2_count: data[2],
            fallouts_month_3_count: data[3],
            fallouts_month_4_count: data[4],
            fallouts_month_5_count: data[5],
            fallouts_month_6_count: data[6],
            fallouts_month_7_count: data[7],
            resolutions_month_0_count: data[8],
            resolutions_month_1_count: data[9],
            resolutions_month_2_count: data[10],
            resolutions_month_3_count: data[11],
            resolutions_month_4_count: data[12],
            resolutions_month_5_count: data[13],
            resolutions_month_6_count: data[14],
            resolutions_month_7_count: data[15]
        };

        return res.status(200).json(result);
    });
});


module.exports = router;