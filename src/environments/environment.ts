export interface ISetting {
    endpoint:string;
}
export const environment = {
    env:process.env.REACT_APP_ENV || 'local',
    local:'https://localhost:7268',
    development:'https://depowersoft.com.au',
    production:'https://depowersoft.com.au',
    endpoint:() => {
        if (environment.env.trim() == 'local') {
          return environment.local;
        }
        if (environment.env.trim() == 'development') {
          return environment.development;
        }
        if (environment.env.trim() == 'production') {
          return environment.production;
        }
        return environment.local;
    }
}



