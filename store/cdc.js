export const state = function() {
  return {
    media: []
  }
}
export const getters = {
  getCdcMedia: (state) => {
    const media = state.media.map((med) => ({
      id: med.id,
      name: med.name,
      attribution: med.attribution,
      description: med.description,
      thumbnailUrl: med.thumbnailUrl,
      alternateImages: med.alternateImages,
      syndicateUrl: med.syndicateUrl
    }))
    return media
  }
}
export const actions = {}
export const mutations = {
  SET_MEDIA: (state, media) => (state.media = media)
}
