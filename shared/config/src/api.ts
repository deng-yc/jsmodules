//@ts-nocheck

const rootDomain = "sounmate.com";
const schema = "https://";
let _apiHosts = {
    client_version_api: `${schema}client-version-manager.${rootDomain}`,

    identity_api_v1: `${schema}identity-api.${rootDomain}/1`,
    content_api_v1: `${schema}content-api.${rootDomain}/1`,
    remind_api_v1: `${schema}remind-api.${rootDomain}/1`,
    management_api_v1: `${schema}management-api.${rootDomain}/1`,
    chat_api_v1: `${schema}chat-api.${rootDomain}/1`,
    live_api: `${schema}live.${rootDomain}`,

    ordering_api_v1: `${schema}ordering-api.${rootDomain}/1`,
    marketing_api_v1: `${schema}marketing-api.${rootDomain}/1`,
    payment_api_v1: `${schema}payment-api.${rootDomain}/1`,
    member_api_v1: `${schema}member-api.${rootDomain}/1`,
};
if (__DEV__) {
    _apiHosts = {
        ..._apiHosts,
        identity_api_v1: `/identity-api/1`,
        content_api_v1: `/content-api/1`,
        remind_api_v1: `/remind-api/1`,
        management_api_v1: `/management-api/1`,
        chat_api_v1: `/chat-api/1`,
        live_api: `/live`,

        ordering_api_v1: `/ordering-api/1`,
        marketing_api_v1: `/marketing-api/1`,
        payment_api_v1: `/payment-api/1`,
        member_api_v1: `/member-api/1`,
    };
}

export const apiHosts = _apiHosts;
