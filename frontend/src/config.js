const Config = {
  network: {
    backendUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000',
    apiPath: process.env.REACT_APP_API_PATH || '/api/v1/',
    apiUrl: process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_PATH,
    wsUrl: process.env.REACT_APP_WS_URL || 'ws://localhost:8000'
  },
  permissions: {
    adminUserTypes: ['SUPER_ADMIN', 'MANAGER']
  }
}

Config.network.apiUrl = process.env.REACT_APP_API_URL || Config.network.backendUrl + Config.network.apiPath

export default Config
