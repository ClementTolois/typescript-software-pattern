import Service from "./Service";

class Service2 extends Service {
    constructor() {
        super("Service2");
    }

    async beforeMount(): Promise<void> {
        this._postsub.once("pong", () => {
            console.log("Pong received in Service2");
        });
        super.beforeMount();
    }

    async mounted(): Promise<void> {
        this._postsub.emit("ping");
        super.mounted();
    }

    async unmounted(): Promise<void> {
        await this.wait(2000);
        super.unmounted();
    }
}

export default Service2;