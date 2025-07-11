## Usage
```typescript
message(option: string | IMessageConfig)
message.succ(option: string | IMessageConfig)
message.fail(option: string | IMessageConfig)

interface IMessageConfig {
    text: string;
    type?: 'plain' | 'succ' | 'fail';
    duration?: number;
    onClose?: (id: number | string) => void; // 关闭后的回调
}
```