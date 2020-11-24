# Express decorators swagger doc

## The Server

Sever.ts

```typescript
const app = express();

const { router } = BuildAPI({
  controllers: [HelloController],
  auth: () => {
    return true;
  },
});

app.use(router);

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
```

## Controller

```typescript
@Controller("/hello")
export class HelloController {
  constructor(
    private helloService: HelloService,
    private newService: NewService
  ) {}

  @Get("/")
  @Middlewares([testMiddlware])
  @Middlewares(helloMiddlware)
  @Authorized(["ADMIN", "USER"])
  hello(_: Request, res: Response): HelloResponse {
    //Your code
    this.helloService.test();
    this.newService.test();
    return { test: "test" };
  }

  @Post("/test")
  @Authorized()
  test(_: Request, res: Response): HelloResponse {
    //Your code
    return { test: "test" };
  }
}
```

## Services

```typescript
@Service()
export class HelloService {
  test() {
    //Your Code
  }
}
```

## Middleware

```typescript
export const helloMiddlware: MiddlewareFunction = (_req, _res, next) => {
  //Your code
  next();
};

export const anotherMiddlware = (aParameter: string) => {
  return (_req, _res, next): MiddlewareFunction => {
    //Your code
    next();
  };
};
```

## Body

Server.ts

```typescript
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

[ControllerName].ts

```typescript
@Controller("/hello")
export class HelloController {
  @Get("/:id")
  hello(@Body body: any): HelloResponse {
    console.log("Hello controller");
    console.log(body);

    return {
      test: "test",
      super: 2,
      superBool: true,
      superDate: new Date(),
    };
  }
}
```

## Context

```typescript
@Controller("/hello")
export class HelloController {
  @Get("/:id")
  hello(@Ctx { res }: ContextType): HelloResponse {
    console.log("Hello controller");
    res.cookie("testCookie", "testCookieVal");

    return {
      test: "test",
      super: 2,
      superBool: true,
      superDate: new Date(),
    };
  }
}
```

## Param

API Endpoint : /api/test/:id  
":id" => @Param("id")

```typescript
@Controller("/hello")
export class HelloController {
  @Get("/:id")
  hello(@Param("id") param: string): HelloResponse {
    console.log("Hello controller");
    console.log(param);

    return {
      test: "test",
      super: 2,
      superBool: true,
      superDate: new Date(),
    };
  }
}
```

## Query

API Endpoint: /api/test?hello=world  
@Query("hello") hello : string  
hello === "world // true

```typescript
@Controller("/hello")
export class HelloController {
  @Get("/")
  hello(@Query("hello") param: string): HelloResponse {
    console.log("Hello controller");
    console.log(param);

    return {
      test: "test",
      super: 2,
      superBool: true,
      superDate: new Date(),
    };
  }
}
```
