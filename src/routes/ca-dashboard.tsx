import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ca-dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ca-dashboard"!</div>
}
