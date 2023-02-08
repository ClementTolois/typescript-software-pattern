import Service from "./Service";

class Service2 extends Service {
    async beforeMount(): Promise<void> {
        this.postsub.once("pong", () => {
            console.log("Pong received in Service2");
        });
    }

    async mounted(): Promise<void> {
        this.postsub.emit("ping");
    }

    async unmounted(): Promise<void> {
        await this.wait(2000);
    }
}

export default Service2;