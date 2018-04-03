export interface IValidator {
    __$vaildateRules__?: any;
    vaildate?: () => Promise<{
        isValue: boolean;
        errors: any[];
    }>;
}
