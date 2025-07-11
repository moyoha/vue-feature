import { h, render, ref } from 'vue';
import MessgeList from './message-list.vue';
import type { IMessageProps, IMessageMethods } from './types'

function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === 'function';
}

const messages = ref<IMessageProps[]>([]);
const messageIds = new Set<number | string>();
let messageCount = 0;
let container: HTMLElement | null = null;

function MessageManger() {
    if(container) {
        return;
    }
    container = document.createElement('div')
    const vm = h(MessgeList, {
        messages: messages.value,
        onClose: remove,
        onAfterClose: destroy
    })
    render(vm, container);
    document.body.appendChild(container);
}

const message: IMessageMethods = function (option) {
    MessageManger();
    let propsOption: IMessageProps;
    if (typeof option === 'string') {
        propsOption = {text: option, id: ++messageCount};
    } else {
        propsOption = {...option, id: ++messageCount};
    }
    messages.value.push(propsOption)
}

message.succ = function (option) {
    if (typeof option === 'string') {
        option = {text: option};
    }
    message({
        type: 'succ',
        ...option
    })
}

message.fail = function (option) {
    if (typeof option === 'string') {
        option = {text: option};
    }
    message({
        type: 'fail',
        ...option
    })
}

function remove(id: number | string): void {
    for (let i = 0; i < messages.value.length; i++) {
        const item = messages.value[i];
        if (item.id === id) {
            if (isFunction(item.onClose)) {
                item.onClose(id);
            }
            
            messages.value.splice(i, 1);
            messageIds.delete(id);
            break;
        }
    }
}

function destroy() {
    if(messages.value.length === 0 && container) {
        render(null, container);
        document.body.removeChild(container);
        container = null;
    }
}

export { message }