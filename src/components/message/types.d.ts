export interface IMessageProps {
    id: number;
    text: string;
    type?: 'plain' | 'succ' | 'fail';
    duration?: number;
    onClose?: (id: number | string) => void;
}

export type IMessageConfig = Omit<IMessageProps, 'id'>;

interface IMessageMethods {
    (option: IMessageConfig | string): void;
    succ: (option: IMessageConfig | string) => void;
    fail: (option: IMessageConfig | string) => void;
}