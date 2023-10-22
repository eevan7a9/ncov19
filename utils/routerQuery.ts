import { type Router } from "#vue-router"

export function alpha2RouteQuery(alpha2: string | undefined, router: Router) {
    const query = { alpha2 }
    router.replace({query})
}