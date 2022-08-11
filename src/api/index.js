import request from '@/utils/request'
import { getToken } from '@/utils/token'
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

export const getChannelsAPI = () => request({
  url: '/v1_0/channels'
})

export const getUserChannelsAPI = () => request({
  url: '/v1_0/user/channels',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export const setUserChannelsAPI = (channels) => request({
  url: '/v1_0/user/channels',
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    channels
  }
})

// eslint-disable-next-line camelcase
export const getArticleListAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  params: {
    channel_id,
    timestamp
  }
})
export const dislikeArticleAPI = (id) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target: id
  },
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
export const reportArticleAPI = (id, type, content) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  data: {
    target: id,
    type: type,
    remark: content
  },
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export const getArticleDetailAPI = (artid) => request({
  url: `/v1_0/articles/${artid}`
})

export const followAuthorAPI = (id) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: id
  }
})

export const cancelFollowArticleAuthorAPI = (target) => request({
  // eslint-disable-next-line camelcase
  url: `/v1_0/user/followings/${target}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export const thumbUpArticleAPI = (artid) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: artid
  }
})

export const cancelThumbUpArticleAPI = (target) => request({
  // eslint-disable-next-line camelcase
  url: `/v1_0/article/likings/${target}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export const getSearchSuggestionAPI = (q) => request({
  url: '/v1_0/suggestion',
  params: {
    q
  }
})

// eslint-disable-next-line camelcase
export const getSearchResultAPI = ({ page = 1, per_page = 10, q }) => request({
  url: '/v1_0/search',
  params: {
    page,
    per_page,
    q
  }
})

export const getUserInfoAPI = () => request({
  url: '/v1_0/user',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export const getUserIntroAPI = () => request({
  url: '/v1_0/user/profile',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export const changeAvatarAPI = (photo) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: photo
})

export const changeUserIntroAPI = (obj) => request({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: obj
})
