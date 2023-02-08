import PostSub from "../core/PostSub";

describe("PostSub implementation tests", () => {
    test("PostSub should be a singleton", () => {
        const postSub1 = PostSub.getInstance();
        const postSub2 = PostSub.getInstance();
        expect(postSub1).toBe(postSub2);
    });
});