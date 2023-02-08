import EventEmitter from "events";

class PostSub extends EventEmitter {
    private static _instance: PostSub;

    private constructor() {
        super();
    }

    public static getInstance(): PostSub {
        if (!PostSub._instance) {
            PostSub._instance = new PostSub();
        }
        return PostSub._instance;
    }
}

export default PostSub;
