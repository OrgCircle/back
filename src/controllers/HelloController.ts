import { Body, Controller, Get } from "../../lib";
import { HelloResponse } from "../responses/HelloResponse";

@Controller("/hello")
export class HelloController {
  @Get("/")
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
