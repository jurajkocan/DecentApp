declare module "websocket-as-promised" {
    class WebSocketAsPromised {
        constructor(ulr: string, options?: any);
        open(): Promise<any>;
        send(data: string | Blob | ArrayBuffer): void;
        close(): Promise<any>;
    }
    namespace WebSocketAsPromised {

    }
    export = WebSocketAsPromised;
}
