import { LogDatasource } from "../../domain/datasources/log.datasourse";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRespositoryImpl implements LogRepository {

    constructor(
        private readonly logDatasource: LogDatasource,
    ){}


    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log);
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLog(severityLevel);
    }

}



