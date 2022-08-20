import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { ProductDetails } from "../components/Product";

const DATA = {
  id: 2,
  title: "Whatever",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus nec dui pulvinar pharetra. Aenean et lacus ut metus sagittis porttitor vel et felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut porta suscipit est.",
  thumbnailAlt: "Barista nalewajacy kawe do Chemexa",
  rating: 4.5,
};

const Home = () => {
  return (
    <div className="flex flex-col  min-h-screen">
      <Header />
      <Main></Main>
      <Footer />
    </div>
  );
};

export default Home;
