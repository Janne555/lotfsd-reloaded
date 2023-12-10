import { Typography } from "@mui/material"
import { Page } from "../components/Layouts"
import { NavLink } from "react-router-dom"

export const NotFoundPage = () => {
  return (
    <Page>
      <Typography variant="h1">404</Typography>
      <NavLink to={`/`}>Back to Character Selection</NavLink>
    </Page>
  )
}
