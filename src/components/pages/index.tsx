import gql from "graphql-tag";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@apollo/client";

const GetToDosQuery = gql`
  query {
    getToDos {
      id
      description
      title
    }
  }
`;

const Index = () => {
  const { data } = useQuery(GetToDosQuery);
  return (
    <Box sx={{ display: "flex" }}>
      <div>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {data?.getToDos?.map((v) => (
            <div>{v.description}</div>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default Index;
