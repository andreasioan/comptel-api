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
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(0, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(0, subInc).endOf(startEnd).toISOString());
    let falloutsMonth1 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(1, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(1, subInc).endOf(startEnd).toISOString());
    let falloutsMonth2 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(2, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(2, subInc).endOf(startEnd).toISOString());
    let falloutsMonth3 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(3, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(3, subInc).endOf(startEnd).toISOString());
    let falloutsMonth4 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(4, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(4, subInc).endOf(startEnd).toISOString());
    let falloutsMonth5 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(5, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(5, subInc).endOf(startEnd).toISOString());
    let falloutsMonth6 = Fallout.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(6, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(6, subInc).endOf(startEnd).toISOString());

    let resolutionsMonth0 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(0, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(0, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth1 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(1, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(1, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth2 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(2, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(2, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth3 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(3, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(3, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth4 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(4, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(4, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth5 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(5, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(5, subInc).endOf(startEnd).toISOString());
    let resolutionsMonth6 = Resolution.count()
        .where(dateType)
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(6, subInc).startOf(startEnd).toISOString())
        .lte(moment(new Date()).utc().subtract(10, 'weeks').subtract(6, subInc).endOf(startEnd).toISOString());

    if (req.query.source) {
        falloutsMonth0.where('source_system').eq(req.query.source);
        falloutsMonth1.where('source_system').eq(req.query.source);
        falloutsMonth2.where('source_system').eq(req.query.source);
        falloutsMonth3.where('source_system').eq(req.query.source);
        falloutsMonth4.where('source_system').eq(req.query.source);
        falloutsMonth5.where('source_system').eq(req.query.source);
        falloutsMonth6.where('source_system').eq(req.query.source);
    }

    if (req.query.target) {
        resolutionsMonth0.where('target_system').eq(req.query.target);
        resolutionsMonth1.where('target_system').eq(req.query.target);
        resolutionsMonth2.where('target_system').eq(req.query.target);
        resolutionsMonth3.where('target_system').eq(req.query.target);
        resolutionsMonth4.where('target_system').eq(req.query.target);
        resolutionsMonth5.where('target_system').eq(req.query.target);
        resolutionsMonth6.where('target_system').eq(req.query.target);
    }

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
    const length = req.query.length;

    if (req.query.code) {
        var error = 'ERROR';
        var num = req.query.code;

        let errorCode0 = Fallout.count()
            .where('source_error_code')
            .eq(error + parseInt(num))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode1 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 1))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode2 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 2))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode3 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 3))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode4 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 4))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode5 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 5))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode6 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 6))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode7 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 7))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode8 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 8))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode9 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 9))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode10 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 10))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode11 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 11))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode12 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 12))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode13 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 13))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode14 = Fallout.count()
            .where('source_error_code')
            .eq(error + (parseInt(num) + 14))
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());

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
            errorCode11: errorCode11,
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
                error_code_14: data[14]
            };

            return res.status(200).json(result);
        });
    } else if (req.query.source) {

        let startedCountQuery = Fallout.count().where('status').eq('STARTED')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let createdCountQuery = Fallout.count().where('status').eq('CREATED')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCountQuery = Fallout.count().where('status').eq('ERROR')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let closedFailureCountQuery = Fallout.count().where('status').eq('CLOSED-FAILURE')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let closedSuccessfullCountQuery = Fallout.count().where('status').eq('CLOSED-SUCCESSFUL')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());

        if (req.query.source != 'All') {
            startedCountQuery.where('source_system').eq(req.query.source);
            createdCountQuery.where('source_system').eq(req.query.source);
            errorCountQuery.where('source_system').eq(req.query.source);
            closedFailureCountQuery.where('source_system').eq(req.query.source);
            closedSuccessfullCountQuery.where('source_system').eq(req.query.source);
        }

        let promises = {
            startedCount: startedCountQuery,
            createdCount: createdCountQuery,
            errorCount: errorCountQuery,
            closedFailureCount: closedFailureCountQuery,
            closedSuccessfullCount: closedSuccessfullCountQuery
        };

        promises = Object.keys(promises).map((x) => promises[x]);
        return Promise.all(promises).then((data) => {
            let result = {
                started_count: data[0],
                created_count: data[1],
                error_count: data[2],
                closed_failure_count: data[3],
                closed_successfull_count: data[4]
            };

            return res.status(200).json(result);
        });
    }
});

router.get('/falloutaverage', function (req, res, next) {
    const length = req.query.length;
    let falloutAverage0 = Fallout.count()
        .where('source_error_code')
        .gte('ERROR1001')
        .lte('ERROR1015')
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
        .lte(moment(new Date()).utc().endOf(length).toISOString());
    let falloutAverage1 = Fallout.count()
        .where('source_error_code')
        .gte('ERROR1101')
        .lte('ERROR1115')
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
        .lte(moment(new Date()).utc().endOf(length).toISOString());
    let falloutAverage2 = Fallout.count()
        .where('source_error_code')
        .gte('ERROR1201')
        .lte('ERROR1215')
        .where('creation_date')
        .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
        .lte(moment(new Date()).utc().endOf(length).toISOString());


    let promises = {
        falloutAverage0: falloutAverage0,
        falloutAverage1: falloutAverage1,
        falloutAverage2: falloutAverage2
    };

    promises = Object.keys(promises).map((x) => promises[x]);
    return Promise.all(promises).then((data) => {
        let result = {
            fallout_average_0: data[0],
            fallout_average_1: data[1],
            fallout_average_2: data[2]
        };

        return res.status(200).json(result);
    });
});

router.get('/resolution', function (req, res, next) {
    const length = req.query.length;

    if (req.query.type === 'error') {

        let errorCode1 = Resolution.count()
            .where('error_code')
            .eq('ERR001')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode2 = Resolution.count()
            .where('error_code')
            .eq('ERR002')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCode3 = Resolution.count()
            .where('error_code')
            .eq('ERR003')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());

        if (req.query.target != 'All') {
            errorCode1.where('target_system').eq(req.query.target);
            errorCode2.where('target_system').eq(req.query.target);
            errorCode3.where('target_system').eq(req.query.target);
        }

        let promises = {
            errorCode1: errorCode1,
            errorCode2: errorCode2,
            errorCode3: errorCode3
        };

        promises = Object.keys(promises).map((x) => promises[x]);
        return Promise.all(promises).then((data) => {
            let result = {
                error_code_0: data[0],
                error_code_1: data[1],
                error_code_2: data[2]
            };

            return res.status(200).json(result);
        });
    } else if (req.query.type === 'status') {

        let startedCountQuery = Resolution.count().where('status').eq('STARTED')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let closedFailureCountQuery = Resolution.count().where('status').eq('CLOSED-FAILURE')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let retryStartedCountQuery = Resolution.count().where('status').eq('RETRY-STARTED')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let retrySuccessCountQuery = Resolution.count().where('status').eq('RETRY-SUCCESS')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let closedSuccessfullCountQuery = Resolution.count().where('status').eq('CLOSED-SUCCESSFUL')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let retryFailureCountQuery = Resolution.count().where('status').eq('RETRY-FAILURE')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());
        let errorCountQuery = Resolution.count().where('status').eq('ERROR')
            .where('creation_date')
            .gte(moment(new Date()).utc().subtract(10, 'weeks').subtract(7, length).startOf(length).toISOString())
            .lte(moment(new Date()).utc().endOf(length).toISOString());

        if (req.query.target != 'All') {
            startedCountQuery.where('target_system').eq(req.query.target);
            closedFailureCountQuery.where('target_system').eq(req.query.target);
            retryStartedCountQuery.where('target_system').eq(req.query.target);
            retrySuccessCountQuery.where('target_system').eq(req.query.target);
            retryFailureCountQuery.where('target_system').eq(req.query.target);
            closedSuccessfullCountQuery.where('target_system').eq(req.query.target);
            errorCountQuery.where('target_system').eq(req.query.target);
        }

        let promises = {
            startedCount: startedCountQuery,
            closedFailureCount: closedFailureCountQuery,
            retryStartedCount: retryStartedCountQuery,
            retrySuccessCount: retrySuccessCountQuery,
            closedSuccessfullCount: closedSuccessfullCountQuery,
            retryFailureCount: retryFailureCountQuery,
            errorCount: errorCountQuery
        };

        promises = Object.keys(promises).map((x) => promises[x]);
        return Promise.all(promises).then((data) => {
            let result = {
                started_count: data[0],
                closed_failure_count: data[1],
                retry_started_count: data[2],
                retry_success_count: data[3],
                closed_successful_count: data[4],
                retry_failure_count: data[5],
                error_count: data[6]
            };

            return res.status(200).json(result);
        });
    }

});

router.get('/sourcedata', function (req, res, next) {

    let falloutCOMQuery = Fallout.count().where('source_system').eq('COM');
    let falloutPNIQuery = Fallout.count().where('source_system').eq('PNI');
    let falloutORDERMANAGERQuery = Fallout.count().where('source_system').eq('ORDERMANAGER');

    let resolutionPNIQuery = Resolution.count().where('target_system').eq('PNI');
    let resolutionHFCQuery = Resolution.count().where('target_system').eq('HFC-SRI');
    let resolutionFTTNQuery = Resolution.count().where('target_system').eq('FTTN-SRI');

    let promises = {
        falloutCOM: falloutCOMQuery,
        falloutPNI: falloutPNIQuery,
        falloutORDERMANAGER: falloutORDERMANAGERQuery,
        resolutionPNI: resolutionPNIQuery,
        resolutionHFC: resolutionHFCQuery,
        resolutionFTTN: resolutionFTTNQuery,
    };

    promises = Object.keys(promises).map((x) => promises[x]);
    return Promise.all(promises).then((data) => {
        let result = {
            fallout_COM: data[0],
            fallout_PNI: data[1],
            fallout_ORDERMANAGER: data[2],
            resolution_PNI: data[3],
            resolution_HFC: data[4],
            resolution_FTTN: data[5]
        };

        return res.status(200).json(result);
    });
});

module.exports = router;