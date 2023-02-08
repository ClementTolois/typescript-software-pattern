import PostSub from "../core/PostSub";
import ServiceLocator from "../core/ServiceLocator";
import Service from "./Service";

class Service1 extends Service {
    private _postsub: PostSub;

    constructor() {
        super();
        this._postsub = ServiceLocator.getInstance().getService("PostSub");
    }

    async beforeMount(): Promise<void> {
        this._postsub.once("ping", () => {
            console.log("Ping received in Service1");
            this._postsub.emit("pong");
        });
    }

    async mounted(): Promise<void> {
        await this.wait(1000);
    }
    
    async unmounted(): Promise<void> {
        await this.wait(1000);
        console.log("Unmounted in Service1");
    }
}

export default Service1;