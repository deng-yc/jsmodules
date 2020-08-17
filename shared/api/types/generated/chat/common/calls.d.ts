export declare class CallsApi {
    private http;
    /**
     * 创建通话记录,获取通话记录列表
     * @method POST 创建通话记录
     * @method GET 获取通话记录列表
     *
     */
    calls(): any;
    /**
     * 获取通话记录
     * @method GET 获取通话记录
     *
     * @params id 通话Id
     */
    callsById(id: any): any;
    /**
     * 获取通话记录
     * @method GET 获取通话记录
     *
     * @params identity 通话Identity
     */
    identitiesByIdentity(identity: any): any;
    /**
     * 挂断通话
     * @method POST 挂断通话
     *
     * @params id 通话Id
     */
    hangUp(id: any): any;
    /**
     * 通话超时
     * @method POST 通话超时
     *
     * @params id 通话Id
     */
    timeout(id: any): any;
    /**
     * 开始通话
     * @method POST 开始通话
     *
     * @params id 通话Id
     */
    start(id: any): any;
    /**
     * 更新通话持续时间
     * @method PUT 更新通话持续时间
     *
     * @params id 通话Id
     */
    durationTime(id: any): any;
    /**
     * 通话结束
     * @method POST 通话结束
     *
     * @params id 通话Id
     */
    end(id: any): any;
    /**
     * 通话支付流程
     * @method POST 通话支付流程
     *
     * @params id 通话Id
     */
    payment(id: any): any;
}
export default CallsApi;
