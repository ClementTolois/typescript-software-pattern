# Typescript Software Pattern

This project is a test for a future typescript project. I wanted to test to implement a solution to reduce the dependency between the services but while keeping an easy way to communicate between them. To archive this I used the Singleton pattern through the ServiceLocator, a Service Factory and a PostSub manager.

I added an hook system in the services to allow the ServiceFactory to mount asynchronously the services. This feature allow to mount the services in any order without having to worry about the cross dependencies.

> You can check the cross dependencies between the `Service1` and `Service2` to see how the hook system works. First, the `beforeMount` hook of all the services is called. Then, the `mounted` hook of all the services is called.

> No `mounted` hook can be called until all the `beforeMount` hooks are called and finished.