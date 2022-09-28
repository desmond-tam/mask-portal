export interface ISetting {
    endpoint:string;
}
export const environment = {
    env:process.env.REACT_APP_ENV || 'local',
    local:'https://localhost:44308',
    development:'https://depowersoft.com.au',
    production:'https://depowersot.com.au',
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
    },
    isLocal:() => {
      return environment.env.trim() == 'local';
    }
}



