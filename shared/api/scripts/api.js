/* eslint-disable */
const codegen = require("./codegen/api");
codegen.apis(
    [
        //#region identity
        {
            outputDir: "identity/common",
            docsUrl: "https://dev-identity-api.sounmate.com/docs/v1/json",
            prefix: "",
            diName: "identity_api_v1",
            rules: {
                ["/1/accounts/phones/{countryCode}-{areaNumber}"]: "checkPhoneNumber",
                ["/1/accounts/me/verify-code"]: "verifyCodeToMe",
            },
        },
        {
            outputDir: "chat/common",
            docsUrl: "https://dev-chat-api.sounmate.com/docs/v1/json",
            prefix: "",
            diName: "chat_api_v1",
            rules: {},
        },
        {
            outputDir: "marketing/common",
            docsUrl: "https://dev-marketing-api.sounmate.com/docs/v1/json",
            prefix: "",
            diName: "marketing_api_v1",
            rules: {
                ["/test"]: "test",
            },
        },
        {
            outputDir: "payment/common",
            docsUrl: "https://dev-payment-api.sounmate.com/docs/v1/json",
            prefix: "",
            diName: "payment_api_v1",
            rules: {
                ["/1/payments/{id}/complete/check"]: "completeCheck",
                ["/1/wechatpay/app/callback"]: "wxCallback",
                ["/1/wechatpay/miniprogram/callback"]: "wxMiniCallback",
                ["/1/paypal/payment/callback"]: "paypalPaymengCallback",
                ["/1/paypal/payout/callback"]: "paypalPayoutCallback",
            },
        },
        {
            outputDir: "ordering/common",
            docsUrl: "https://dev-ordering-api.sounmate.com/docs/v1/json",
            prefix: "",
            diName: "ordering_api_v1",
            rules: {},
        },
        {
            outputDir: "member/common",
            docsUrl: "https://dev-member-api.sounmate.com/docs/v1/json",
            prefix: "",
            diName: "member_api_v1",
            rules: {},
        },
        {
            outputDir: "content/common",
            docsUrl: "https://dev-content-api.sounmate.com/docs/v1/json",
            prefix: "",
            diName: "content_api_v1",
            rules: {
                ["/1/articles/{id}/shares/callback"]: "sharesCallback",
                ["/1/articles/collect"]: "myCollect",
                ["/1/articles/dislike"]: "myDislike",
                ["/1/articles/like"]: "myLike",

                ["/1/mates/{id}/shares/callback"]: "sharesCallback",
                ["/1/mates/collect"]: "myCollect",
                ["/1/mates/dislike"]: "myDislike",
                ["/1/mates/like"]: "myLike",
                ["/1/categories/{id}/items"]: "itemsById",
                ["/1/categories/names/{name}/items"]: "itemsByName",

                ["/1/comments/like"]: "getLike",
                ["/1/comments/dislike"]: "getDislike",

                ["/1/barrages/like"]: "getLike",
                ["/1/barrages/dislike"]: "getDislike",
            },
        },
        {
            outputDir: "remind/common",
            docsUrl: "https://dev-remind-api.sounmate.com/docs/v1/json",
            prefix: "",
            diName: "remind_api_v1",
            rules: {},
        },
    ],
    {
        outputDir: "src/generated",
    }
);
