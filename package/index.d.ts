declare module "modelok" {
    export type TLengthParams = {
        message?: string;
        minLength?: number;
        maxLength?: number;
    };
    export type TPatternParams = {
        message?: string;
        pattern: string;
    };
    const validate: (model: any, errors?: any) => {
        done: () => any;
        require: (field: string, message?: string) => any;
        length: (field: string, params?: TLengthParams) => any;
        email: (field: string, message: string) => any;
        pattern: (field: string, params: TPatternParams) => any;
    };
    export default validate;
}
