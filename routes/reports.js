var express = require('express');
var router = express.Router();
var moment = require('moment');

var Fallout = require('../models/fallout');
var Resolution = require('../models/resolution');
var Detail = require('../models/detail');

// Get Reports
router.get('/dates', function (req, res, next) {

    var subInc = 'days';
    var startEnd = 'day';
    var dateType = req.query.datetype;

    switch (req.query.length) {
        case 'hours':
            subInc = 'hours';
            startEnd = 'hour';
            break;
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
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(0, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(0, subInc).endOf(startEnd).toISOString());
    let falloutsMonth1 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(1, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(1, subInc).endOf(startEnd).toISOString());
    let falloutsMonth2 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(2, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(2, subInc).endOf(startEnd).toISOString());
    let falloutsMonth3 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(3, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(3, subInc).endOf(startEnd).toISOString());
    let falloutsMonth4 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(4, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(4, subInc).endOf(startEnd).toISOString());
    let falloutsMonth5 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(5, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(5, subInc).endOf(startEnd).toISOString());
    let falloutsMonth6 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(6, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(6, subInc).endOf(startEnd).toISOString());

    let resolutionsMonth0 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(0, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(0, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth1 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(1, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(1, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth2 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(2, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(2, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth3 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(3, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(3, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth4 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(4, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(4, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth5 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(5, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(5, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth6 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).subtract(10, 'weeks').subtract(6, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).subtract(10, 'weeks').subtract(6, subInc).endOf(startEnd).toISOString());

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
            resolutions_month_0_count: data[7],
            resolutions_month_1_count: data[8],
            resolutions_month_2_count: data[9],
            resolutions_month_3_count: data[10],
            resolutions_month_4_count: data[11],
            resolutions_month_5_count: data[12],
            resolutions_month_6_count: data[13]
        };

        return res.status(200).json(result);
    });
});

router.get('/fallout', function (req, res, next) {

    if (req.query.code) {
        var error = 'ERROR';
        var num = req.query.code;

        let errorCode0 = Fallout.count()
            .where('source_error_code')
            .eq(error + parseInt(num));
        let errorCode1 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 1));
        let errorCode2 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 2));
        let errorCode3 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 3));
        let errorCode4 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 4));
        let errorCode5 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 5));
        let errorCode6 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 6));
        let errorCode7 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 7));
        let errorCode8 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 8));
        let errorCode9 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 9));
        let errorCode10 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 10));
        let errorCode11 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 11));
        let errorCode12 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 12));
        let errorCode13 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 13));
        let errorCode14 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 14));

        console.log(error + (parseInt(num) + 1));

        let promises = {
            errorCode0: errorCode0,
            errorCode1: errorCode1,
            errorCode2: errorCode2,
            errorCode3: errorCode3,
            errorCode4: errorCode4,
            errorCode5: errorCode5,
            errorCode6: errorCode6,
            errorCode7: errorCode7,
            errorCode8: errorCode8,
            errorCode9: errorCode9,
            errorCode10: errorCode10,
            errorCode12: errorCode12,
            errorCode13: errorCode13,
            errorCode14: errorCode14
        };

        promises = Object.keys(promises).map((x) => promises[x]);
        return Promise.all(promises).then((data) => {
            let result = {
                error_code_0: data[0],
                error_code_1: data[1],
                error_code_2: data[2],
                error_code_3: data[3],
                error_code_4: data[4],
                error_code_5: data[5],
                error_code_6: data[6],
                error_code_7: data[7],
                error_code_8: data[8],
                error_code_9: data[9],
                error_code_10: data[10],
                error_code_11: data[11],
                error_code_12: data[12],
                error_code_13: data[13],
                error_code_14: data[14],
            };

            return res.status(200).json(result);
        });
    }

    res.send('nah mate not implemented');



});


module.exports = router;