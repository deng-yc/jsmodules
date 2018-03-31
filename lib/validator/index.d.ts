declare class Modal {
    name: string;
    vaildate(): Promise<{
        isValid;
        errors;
    }>;
}
declare var model: Modal;
declare const submit: () => Promise<void>;
