import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";


const fileSystemLogRepository = new LogRespositoryImpl(
  new FileSystemDatasource()
)

export class Server {
  static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
      const url = 'https://google.com';
      new CheckService(
        fileSystemLogRepository,
        ()=> console.log( `${url} is ok` ),
        (error)=> console.log(error)
      ).execute(url);
      // new CheckService().execute('http://localhost:3000'); https://google.com
    });

    // CronService.createJob("*/2 * * * * *", () => {
    //   const date = new Date();
    //   console.log("2 seconds", date);
    // });

    // CronService.createJob("*/3 * * * * *", () => {
    //   const date = new Date();
    //   console.log("3 seconds", date);
    // });
  }
}
