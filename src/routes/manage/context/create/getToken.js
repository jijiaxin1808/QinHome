import qiniu from 'qiniu'
qiniu.conf.ACCESS_KEY = 'eONtL-BfTlelCdVqE8ukWFPeAWZ2euF_u0s2mIfE'
qiniu.conf.SECRET_KEY = 'mCV-KHLcAtHYw8pttqGb6gPrncUZHq5NmU9muop0'
const bucket = 'test'
const getToken = () => {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: bucket
  })
  return putPolicy.uploadToken()
}
export default getToken
