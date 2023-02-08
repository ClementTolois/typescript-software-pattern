import Service from "./Service";

class Service3 extends Service {
    async beforeMount(): Promise<void> {
        await this.wait(4000);
    }

    async mounted(): Promise<void> {
        await this.wait(5000);
    }

    async unmounted(): Promise<void> {
        await this.wait(5000);
    }
}

export default Service3;