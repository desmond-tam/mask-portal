export interface ISetting {
    endpoint:string;
}
export const environment = {
    env:process.env.REACT_APP_ENV || 'local',
    local:'http://192.168.1.80',
    development:'https://api.depowersoft.com',
    production:'https://api.depowersoft.com',
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



