export const state = function() {
  return {
    media: []
  }
}
export const getters = {
  getCdcMedia: (state) => {
    const media = state.media.map((med) => ({
      name: med.name,
      description: med.description,
      thumbnailUrl: med.thumbnailUrl,
      alternateImages: med.alternateImages
    }))
    return media
  }
}
export const actions = {}
export const mutations = {
  SET_MEDIA: (state, media) => (state.media = media)
}
