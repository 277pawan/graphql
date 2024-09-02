import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query Movies {
    movies {
      name
      isInThreature
      id
      yearofPublication
    }
  }
`;

const FETCH_MOVIE = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      isInThreature
    }
  }
`;

export default function Displaydata() {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: moviesdata } = useQuery(QUERY_ALL_MOVIES);

  const [movieName, setMovieName] = useState("");
  const [fetchMovie, { data: searchMovieData }] = useLazyQuery(FETCH_MOVIE);

  if (loading) {
    return <h1>Data is Loading...</h1>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {/* Display Users */}
      {data &&
        data.users.map((user, index) => {
          return (
            <div
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "4px",
                margin: "8px",
                padding: "4px",
                border: "1px solid gray",
              }}
              key={index} // Use a unique identifier like user.id
            >
              <p>FirstName: {user.name}</p>
              <p>Name: {user.username}</p>
              <p>Age: {user.age}</p>
              <p>Nationality: {user.nationality}</p>
            </div>
          );
        })}

      {/* Display Movies */}
      {moviesdata &&
        moviesdata.movies.map((movie, index) => {
          return (
            <div
              style={{
                borderRadius: "4px",
                backgroundColor: "skyblue",
                color: "black",
                margin: "10px",
                padding: "4px",
              }}
              key={index} // Use a unique identifier like movie.id
            >
              <p>MovieName: {movie.name}</p>
              <p>IsInThreature: {movie.isInThreature ? "Yes" : "No"}</p>
              <p>Id: {movie.id}</p>
              <p>Year: {movie.yearofPublication}</p>
            </div>
          );
        })}

      {/* Movie Search */}
      <div>
        <input
          type="text"
          placeholder="Enter your movie name...."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <button
          style={{ color: "white" }}
          onClick={() => fetchMovie({ variables: { name: movieName } })}
        >
          Click here
        </button>
      </div>

      {/* Display Searched Movie */}
      <div>
        {searchMovieData && searchMovieData.movie && (
          <div>
            <h3>Name of Search Movie: {searchMovieData.movie.name}</h3>
            <p>
              Is in Theatre:{" "}
              {searchMovieData.movie.isInThreature ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
