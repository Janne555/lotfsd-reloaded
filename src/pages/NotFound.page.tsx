import { Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import { Page } from "../layouts/Page"

export const NotFoundPage = () => {
  return (
    <Page>
      <Typography variant="h1">404</Typography>
      <NavLink to={`/`}>Back to Character Selection</NavLink>
    </Page>
  )
}
