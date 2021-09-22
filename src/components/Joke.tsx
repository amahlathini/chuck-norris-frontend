import { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button } from "react-bootstrap";
import "../styles.css";
import Select from "react-select";
import { LinearProgress } from "@material-ui/core";
import "react-awesome-button/dist/styles.css";
import "react-dropdown/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { JokeContext } from "../Contexts/JokeContext";

export default function Joke() {
  const {
    category,
    setJoke,
    setCategory,
    setByCategory,
    byCategory
  } = useContext(JokeContext);

  // graphql
  const ALL_JOKES_AND_CATEGORIES = gql`
    query Query($category: String) {
      jokeByCategory(category: $category) {
        value
        icon_url
        id
      }
      randomJoke {
        id
        icon_url
        value
      }
      categories {
        id
        category
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(ALL_JOKES_AND_CATEGORIES, {
    variables: {
      category: category
    }
  });

  if (loading) return <LinearProgress color="secondary" />;
  if (error) return <p>Whoops ... something is wrong!</p>;

  const jokeValue = byCategory
    ? data.jokeByCategory.value
    : data.randomJoke.value;

  const onChange = (option) => {
    //option.preventDefault();
    setCategory(option.value);
    setByCategory(true);
    console.log("Option Value: " + option.value);
    console.log("Category Value: " + category);
  };

  const getNewJoke = async () => {
    setByCategory(false);
    setJoke(jokeValue);
    refetch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setByCategory(true);
    setJoke(jokeValue);
    refetch();
  };

  const options = data.categories.map((d) => ({
    value: d.category,
    label: d.category
  }));

  /*  */

  return (
    <div>
      <form
        className="joke-form"
        onSubmit={handleSubmit}
        style={{
          display: "inherit",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <Button onClick={getNewJoke}>GENERATE RANDOM</Button>
        <br />
        <br />
        <Select
          {...{ category, onChange, options }}
          //   isOptionDisabled={(opt) => opt.disabled}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.value}
        />
        <Button variant="secondary" type="submit" name="submit" id="submit-btn">
          By Category
        </Button>
      </form>
    </div>
  );
}
