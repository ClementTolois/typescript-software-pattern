import Service from "./Service";

class Service1 extends Service {
    async beforeMount(): Promise<void> {
        this.postsub.once("ping", () => {
            console.log("Ping received in Service1");
            this.postsub.emit("pong");
        });
    }

    async mounted(): Promise<void> {
        await this.wait(1000);
    }
    
    async unmounted(): Promise<void> {
        await this.wait(1000);
    }
}

export default Service1;