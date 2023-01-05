import PaytmChecksum from "../paytm/PaytmChecksum.js";

import { v4 as uuid } from "uuid";

import https from "https";

export const addPaymentGateway = async (request, response) => {
    try {
        const paytmParams = {
            "MID": process.env.PAYTM_MID,
            "WEBSITE": process.env.PAYTM_WEBSITE,
            "CHANNEL_ID": process.env.PAYTM_CHANNEL_ID,
            "INDUSTRY_TYPE_ID": process.env.PAYTM_INDUSTRY_TYPE_ID,
            "ORDER_ID": uuid(),
            "CUST_ID": process.env.PAYTM_CUST_ID,
            "TXN_AMOUNT": request.body.amount.toString(),
            "CALLBACK_URL": "http://localhost:8000/callback",
            "EMAIL": request.body.email,
            "MOBILE_NO": request.body.mobile
        }
        const paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;

        const paytmChecksum = await PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey);
        const params = {
            ...paytmParams, "CHECKSUMHASH": paytmChecksum
        };
        response.status(200).json(params);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

//Callback function to handle final paytm response i.e., after paytm api communicated with respective
//bank servers post payment from the user end
export const paytmResponse = async (request, response) => {
    const paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;

    const paytmChecksum = request.body.CHECKSUMHASH;
    delete request.body.CHECKSUMHASH;

    const isVerifySignature = await PaytmChecksum.verifySignature(request.body, paytmMerchantKey, paytmChecksum);
    if(isVerifySignature) {
        const paytmParams = request.body;

        PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey).then(function(checksum) {
            paytmParams["CHECKSUMHASH"] = checksum;

            const postData = JSON.stringify(paytmParams);
            const options = {
                /* for Staging or Testing */
                hostname: "securegw-stage.paytm.in",

                /* for Production */
                // hostname: "securegw.paytm.in",
                port: 443,
                path: "/order/status",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": postData.length
                }
            };

            // Set up the request
            let res = "";
            const postRequest = https.request(options, function(postResponse) {
                postResponse.on("data", function(chunk) {
                    res += chunk;
                });

                postResponse.on("end", function() {
                    const result = JSON.parse(res);
                    console.log(result);
                    response.status(200).json(result);
                    //response.redirect("http://localhost:3000/");
                });
            });

            // post the data
            postRequest.write(postData);
            postRequest.end();

        }).catch(function(error) {
            console.log(error);
        });
    }
    else {
        console.log("Checksum mismatched.");
    }
}