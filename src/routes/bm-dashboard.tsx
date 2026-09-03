import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bm-dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bm-dashboard"!</div>
}
