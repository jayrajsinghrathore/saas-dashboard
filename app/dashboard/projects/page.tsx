import { ProjectsPage } from "@/components/projects-page"
import { getProjects } from "@/lib/data"

export default async function Projects() {
  const projects = await getProjects()

  return <ProjectsPage projects={projects} />
}
