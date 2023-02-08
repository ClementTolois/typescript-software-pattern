import Service from "./Service";

class Service1 extends Service {
    constructor() {
        super("Service1");
    }

    async beforeMount(): Promise<void> {
        this._postsub.once("ping", () => {
            console.log("Ping received in Service1");
            this._postsub.emit("pong");
        });
        super.beforeMount();
    }

    async mounted(): Promise<void> {
        await this.wait(1000);
        super.mounted();
    }
    
    async unmounted(): Promise<void> {
        await this.wait(1000);
        super.unmounted();
    }
}

export default Service1;