import { useState, useEffect } from "react";
import "./App.css";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const key = import.meta.env.REACT_APP_API_KEY;
  const [images, setImages] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await fetch(
        `https://pixabay.com/api/?key=${key}&q=${term}&image_type=photo&pretty=true`
      );
      const data = await res.json();
      setImages(data.hits);
      setLoading(false);
      console.log(images);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {loading ? (
        <h1 className="text-xl font-semibold text-center">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.key} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
