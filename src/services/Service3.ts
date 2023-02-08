import Service from "./Service";

class Service3 extends Service {
    constructor() {
        super("Service3");
    }

    async beforeMount(): Promise<void> {
        await this.wait(4000);
        super.beforeMount();
    }

    async mounted(): Promise<void> {
        await this.wait(5000);
        super.mounted();
    }

    async unmounted(): Promise<void> {
        await this.wait(5000);
        super.unmounted();
    }
}

export default Service3;