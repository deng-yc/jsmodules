/* eslint-disable */
const codegen = require("./src/index");
codegen.apis(
    [
        //#region identity
        {
            outputDir: "v1",
            docsUrl: "https://staging-identity-api.discology.me/docs/v1/json",
            prefix: "",
            diName: "identity_api_v1",
            rules: {
                "/1/accounts/me/verify-code": "sendVerifyCodeToMe",
                "/1/accounts/verify-code": "sendVerifyCode",
            },
        },
        //#endregion
        {
            outputDir: "v1",
            docsUrl: "https://staging-activity-api.discology.me/docs/v1/json",
            prefix: "",
            diName: "activity_api_v1",
            rules: {},
        },
        {
            outputDir: "v1",
            docsUrl: "https://staging-member-api.discology.me/docs/v1/json",
            prefix: "",
            diName: "member_api_v1",
            rules: {},
        },
        {
            outputDir: "v1",
            docsUrl: "https://staging-content-api.discology.me/docs/v1/json",
            prefix: "",
            diName: "content_api_v1",
            rules: {
                "/1/articles/like": "getLikeArticles",
                "/1/articles/dislike": "getDislikeArticles",
                "/1/articles/collect": "getCollectArticles",

                "/1/comments/like": "getLikeComments",
                "/1/comments/dislike": "getDislikeComments",

                "/1/categories/names/{name}/items": "itemsByName",
                "/1/categories/{id}/items": "itemsById",
            },
        },
        {
            outputDir: "v1",
            docsUrl: "https://staging-remind-api.discology.me/docs/v1/json",
            prefix: "",
            diName: "remind_api_v1",
            rules: {},
        },
        {
            outputDir: "v1",
            docsUrl: "https://staging-ordering-api.discology.me/docs/v1/json",
            prefix: "",
            diName: "ordering_api_v1",
            rules: {},
        },
        {
            outputDir: "v1",
            docsUrl: "https://staging-marketing-api.discology.me/docs/v1/json",
            prefix: "",
            diName: "marketing_api_v1",
            rules: {},
        },
        {
            outputDir: "v1",
            docsUrl: "https://staging-payment-api.discology.me/docs/v1/json",
            prefix: "",
            diName: "payment_api_v1",
            rules: {
                "/1/paypal/payment/callback": "paymentCallback",
                "/1/paypal/payout/callback": "payoutCallback",
                "/1/wechatpay/app/callback": "appCallback",
                "/1/wechatpay/miniprogram/callback": "miniprogramCallback",
            },
        },
    ],
    {
        srcPath: "src",
        outputPath: "src/generated/client",
        security: {
            required: false,
        },
    }
);
