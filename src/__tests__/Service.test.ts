import PostSub from "../core/PostSub";
import Service from "../services/Service";

class TestService extends Service {
    async beforeMount(): Promise<void> { }
    async mounted(): Promise<void> { }
    async unmounted(): Promise<void> { }
}

describe("Service implementation tests", () => {
    test("Service should provider the instance of PostSub to his children", async () => {
        const service = new TestService();
        expect(service.postsub).toBe(PostSub.getInstance());
    });

    test("Service should provide a wait method", async () => {
        const service = new TestService();
        expect(service.wait).toBeInstanceOf(Function);
    });

    test("Wait method should return after the specified time", async () => {
        const service = new TestService();
        const start = Date.now();
        await service.wait(1000);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(1000);
    });
});